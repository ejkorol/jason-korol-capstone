import db from "@/lib/db-instance";
import { v4 as uuidv4 } from "uuid";
import { openai } from "@ai-sdk/openai";
import { streamObject } from "ai";
import { dreamSchema } from "./dreamSchema";
import { dreamPrompt } from "./dreamPrompt";
import { uploadFile } from "@/lib/s3";
import { getSignedUrl } from "@/utils/getSignedUrl";
import generateImage from "./generateImage";
import { imagePrompt, symbolPrompt } from "./imagePrompt";
import { decrypt } from "@/lib/auth";
import { cookies } from "next/headers";

export const maxDuration = 30;

export async function POST(req: Request) {
  try {
    const token = cookies().get("Authorization");
    if (!token) return;
    const { userId } = await decrypt(token.value);

    const { context } = await req.json();
    const fileName = uuidv4();

    if (!context || !userId) throw new Error("Params missing.");

    const result = await streamObject({
      model: openai('gpt-3.5-turbo'),
      schema: dreamSchema,
      prompt: dreamPrompt(context, userId),

      async onFinish(event) {

        if (event.error) {
          throw new Error("an error occured")
        };

        const base64Image = await generateImage(context, imagePrompt);
        await uploadFile(base64Image, fileName);

        const dream = {
          user_id: userId,
          dream_title: event.object?.analysis.dream_title,
          dream_context: context,
          dream_analysis: event.object?.analysis.dream_analysis,
          dream_image: getSignedUrl(fileName),
        };

        const dreamId = await db("dreams").insert(dream);

        event.object?.analysis.dream_tags.forEach(async (tag) => {
          const tagInDatabase = await db("tags").where("tags.tag_name", tag.tag_name.toLowerCase()).first();
          if (!tagInDatabase) {
            const tagId = await db("tags").insert({ user_id: dream.user_id, tag_name: tag.tag_name.toLowerCase() })
            await db("tags_dreams").insert({ tag_id: tagId, dream_id: dreamId })
          } else {
            await db("tags_dreams").insert({ tag_id: tagInDatabase.id, dream_id: dreamId })
          };
        });

        event.object?.analysis.dream_symbols.forEach(async (symbol) => {
          const symbolInDatabase = await db("symbols").where("symbols.symbol_name", symbol.symbol_name.toLowerCase()).first();
          if (!symbolInDatabase) {
            const symbolImageFileName = uuidv4();
            const base64SymbolImage = await generateImage(symbol.symbol_name, symbolPrompt);
            await uploadFile(base64SymbolImage, symbolImageFileName);
            const symbolId = await db("symbols").insert({ user_id: dream.user_id, symbol_name: symbol.symbol_name.toLowerCase(), symbol_analysis: symbol.symbol_analysis, symbol_image: getSignedUrl(symbolImageFileName) });
            await db("symbols_dreams").insert({ symbol_id: symbolId, dream_id: dreamId });
          } else {
            await db("symbols_dreams").insert({ symbol_id: symbolInDatabase.id, dream_id: dreamId });
          };
        });
      }

    })

    return result.toTextStreamResponse();

  } catch(e: any) {
    return new Response(e.message, { status: 500 });
  };
};
