import db from "@/lib/db-instance";

type Dream = {
  dream_id: number;
  dream_title: string;
}

type Symbol = {
  symbol_id: number;
  user_id: number;
  symbol_name: string;
  symbol_analysis: string;
  symbol_image: string;
  created_at: string;
}

type Result = {
  symbol_id: number;
  user_id: number;
  symbol_name: string;
  symbol_analysis: string;
  symbol_image: string;
  created_at: string;
  apperances: Dream[]; 
}

export async function GET(_req: Request, { params }: { params: { userId: number, symbolId: number } }) {
  try {

    const [symbol] = await db("symbols")
      .where("symbols.id", params.symbolId)
      .select(
        "symbols.id as symbol_id",
        "symbols.user_id",
        "symbols.symbol_name",
        "symbols.symbol_analysis",
        "symbols.symbol_image",
        "symbols.created_at"
      )

    let result: Result = {
      symbol_id: symbol.symbol_id,
      user_id: symbol.user_id,
      symbol_name: symbol.symbol_name,
      symbol_analysis: symbol.symbol_analysis,
      symbol_image: symbol.symbol_image,
      created_at: symbol.created_at,
      apperances: []
    }

    const dreamIds = await db("symbols_dreams")
      .where("symbols_dreams.symbol_id", params.symbolId)
      .select(
        "symbols_dreams.dream_id as dream_id"
      );

    for (const dreamIdObj of dreamIds) {
      const dream = await db("dreams")
        .where("dreams.id", dreamIdObj.dream_id)
        .select(
          "dreams.id as dream_id",
          "dreams.dream_title"
        )
        .first();
      result.apperances.push(dream)
    }

    return Response.json(result);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
