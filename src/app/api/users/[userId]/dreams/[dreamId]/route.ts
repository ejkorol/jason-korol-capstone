import db from "@/lib/db-instance";

type Tag = {
  tag_id: number;
  user_id: number;
  tag_name: string;
};

type Symbol = {
  symbol_id: number;
  user_id: number;
  symbol_name: string;
  symbol_analysis: string;
  symbol_image: string;
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

    const tagIds = await db("tags_dreams")
      .where("tags_dreams.dream_id", params.dreamId)
      .select("tags_dreams.tag_id as tag_id");

    for (const tagIdObj of tagIds) {
      const tag = await db("tags")
        .where("tags.id", tagIdObj.tag_id)
        .select(
          "tags.id as tag_id",
          "tags.user_id",
          "tags.tag_name"
        )
        .first()
      result.tags.push(tag);
    };

    const symbolIds = await db("symbols_dreams")
      .where("symbols_dreams.dream_id", params.dreamId)
      .select("symbols_dreams.symbol_id as symbol_id");

    for (const symbolIdObj of symbolIds) {
      const symbol = await db("symbols")
        .where("symbols.id", symbolIdObj.symbol_id)
        .select(
          "symbols.id as symbol_id",
          "symbols.user_id",
          "symbols.symbol_name",
          "symbols.symbol_analysis",
          "symbols.symbol_image"
        )
        .first()
      result.symbols.push(symbol);
    };

    return Response.json(result);
  } catch (e:any) {
    return new Response(e.message, { status: 500 });
  };
};
