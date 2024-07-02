import db from "@/lib/db-instance";

type Tag = {
  tag_id: number;
  tag_name: string;
};

type Symbol = {
  symbol_id: number;
  symbol_name: string;
}

type Result = {
  id: number;
  dream_title: string;
  dream_context: string;
  dream_analysis: string;
  dream_image: string;
  created_at: string;
  tags: Tag[];
  symbols: Symbol[];
}

export async function GET(_req: Request, { params }: { params: { dreamId: number } }) {
  try {
    const [dream] = await db("dreams")
      .where("dreams.id", params.dreamId)
      .select(
        "dreams.id as dream_id",
        "dreams.dream_title",
        "dreams.dream_context",
        "dreams.dream_analysis",
        "dreams.dream_image",
        "dreams.created_at"
      );

    const tags = await db("tags")
      .where("tags.dream_id", params.dreamId)
      .select(
        "tags.id as tag_id",
        "tags.tag_name"
      );

    const symbols = await db("symbols")
      .where("symbols.dream_id", params.dreamId)
      .select(
        "symbols.id as symbol_id",
        "symbols.symbol_name"
      );

    let result: Result = {
      id: dream.dream_id,
      dream_title: dream.dream_title,
      dream_context: dream.dream_context,
      dream_analysis: dream.dream_analysis,
      dream_image: dream.dream_image,
      created_at: dream.created_at,
      tags: [],
      symbols: [],
    };

    tags.forEach((tag: Tag) => {
      result.tags.push(tag);
    });

    symbols.forEach((symbol: Symbol) => {
      result.symbols.push(symbol);
    });

    return Response.json(result);
  } catch (e:any) {
    return new Response(e.message, { status: 500 });
  };
};
