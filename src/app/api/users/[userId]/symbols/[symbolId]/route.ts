import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { userId: number, symbolId: number } }) {
  try {

    const symbol = await db("symbols")
      .where("symbols.id", params.symbolId);

    return Response.json(symbol);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
