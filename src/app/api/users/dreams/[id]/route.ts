import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { id: number} } ) {
  try {

    const dreams = await db("dreams")
      .where("dreams.user_id", params.id)
      .select(
        "dreams.id as dream_id",
        "dreams.dream_title",
        "dreams.dream_context",
        "dreams.dream_analysis",
        "dreams.dream_image",
        "dreams.created_at"
      );

    const tags = await db("tags")
      .whereIn("tags.dream_id", dreams.map(dream => dream.dream_id))
      .select(
        "tags.id as tag_id",
        "tags.dream_id",
        "tags.tag_name"
      );
    
    const symbols = await db("symbols")
      .whereIn("symbols.dream_id", dreams.map(dream => dream.dream_id))
      .select(
        "symbols.id as symbol_id",
        "symbols.dream_id",
        "symbols.symbol_name"
    );

    const dreamsMap = dreams.reduce((acc, dream) => {
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

    tags.forEach(tag => {
      if (dreamsMap[tag.dream_id]) {
        dreamsMap[tag.dream_id].tags.push({
          id: tag.tag_id,
          tag_name: tag.tag_name
        });
      };
    });

    symbols.forEach(symbol => {
      if (dreamsMap[symbol.dream_id]) {
        dreamsMap[symbol.dream_id].symbols.push({
          id: symbol.symbol_id,
          symbol_name: symbol.symbol_name
        });
      };
    });

    const result = Object.values(dreamsMap);

    return Response.json(result);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
