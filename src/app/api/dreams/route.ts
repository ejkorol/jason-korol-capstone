import db from "@/lib/db-instance";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { dreamSchema } from "./dreamSchema";
import { dreamPrompt } from "./dreamPrompt";
import generateImage from "./generateImage";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const { context } = await req.json();

    const result = await streamObject({
      model: openai('gpt-3.5-turbo'),
      schema: dreamSchema,
      prompt: dreamPrompt(context),

      async onFinish(event) {

        const dream = {
          user_id: 1,
          dream_title: event.object?.analysis.dream_title,
          dream_context: context,
          dream_analysis: event.object?.analysis.dream_analysis,
          dream_image: await generateImage(context),
        }

        const dreamId = await db("dreams").insert(dream);

        const tags = event.object?.analysis.dream_tags.split(",");
        tags?.forEach(async (tag: string) => { 
          await db("tags").insert({ dream_id: dreamId, user_id: dream.user_id, tag_name: tag.trim() })
        });

        const symbols = event.object?.analysis.dream_symbols.split(",");
        symbols?.forEach(async (symbol: string) => {
          await db("symbols").insert({ dream_id: dreamId, user_id: dream.user_id, symbol_name: symbol, symbol_analysis: "some meaning" });
        });
      }

    })

    return result.toTextStreamResponse();

  } catch(e: any) {
    return new Response(e.message, { status: 500 });
  };
};
