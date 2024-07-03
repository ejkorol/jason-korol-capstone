import db from "@/lib/db-instance";

type Tag = {
  tag_id: number;
  user_id: number;
  tag_name: string;
  dream_id?: number;
};

type Symbol = {
  symbol_id: number;
  user_id: number;
  symbol_name: string;
  symbol_analysis: string;
  symbol_image: string;
  dream_id?: number;
};

type Dream = {
  dream_id: number;
  dream_title: string;
  dream_context: string;
  dream_analysis: string;
  dream_image: string;
  created_at: string;
};

type Result = {
  id: number;
  dream_title: string;
  dream_context: string;
  dream_analysis: string;
  dream_image: string;
  created_at: string;
  tags: Tag[];
  symbols: Symbol[];
};

export async function GET(_req: Request, { params }: { params: { userId: number } }) {
  try {
    const dreams: Dream[] = await db("dreams")
      .where("dreams.user_id", params.userId)
      .select(
        "dreams.id as dream_id",
        "dreams.dream_title",
        "dreams.dream_context",
        "dreams.dream_analysis",
        "dreams.dream_image",
        "dreams.created_at"
      );

    const dreamIds = dreams.map(dream => dream.dream_id);

    const [tagDreams, symbolDreams] = await Promise.all([
      db("tags_dreams")
        .whereIn("tags_dreams.dream_id", dreamIds)
        .join(
          "tags",
          "tags.id", "=", "tags_dreams.tag_id")
        .select(
          "tags_dreams.dream_id",
          "tags.id as tag_id",
          "tags.user_id",
          "tags.tag_name"
        ),
      db("symbols_dreams")
      .whereIn("symbols_dreams.dream_id", dreamIds)
      .join(
        "symbols",
        "symbols.id", "=", "symbols_dreams.symbol_id")
      .select(
        "symbols_dreams.dream_id",
        "symbols.id as symbol_id",
        "symbols.user_id",
        "symbols.symbol_name",
        "symbols.symbol_analysis",
        "symbols.symbol_image"
      )
    ]);

    const dreamsMap: { [key: number]: Result } = dreams.reduce((acc: { [key: number]: Result }, dream) => {
      acc[dream.dream_id] = {
        id: dream.dream_id,
        dream_title: dream.dream_title,
        dream_context: dream.dream_context,
        dream_analysis: dream.dream_analysis,
        dream_image: dream.dream_image,
        created_at: dream.created_at,
        tags: [],
        symbols: []
      };
    return acc;
    }, {});

    tagDreams.forEach(tag => {
      if (dreamsMap[tag.dream_id]) {
        dreamsMap[tag.dream_id].tags.push({
          tag_id: tag.tag_id,
          user_id: tag.user_id,
          tag_name: tag.tag_name
        });
      }
    });

    symbolDreams.forEach(symbol => {
      if (dreamsMap[symbol.dream_id]) {
        dreamsMap[symbol.dream_id].symbols.push({
          symbol_id: symbol.symbol_id,
          user_id: symbol.user_id,
          symbol_name: symbol.symbol_name,
          symbol_analysis: symbol.symbol_analysis,
          symbol_image: symbol.symbol_image
        });
      }
    });

    const result = Object.values(dreamsMap);
    return Response.json(result);

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
