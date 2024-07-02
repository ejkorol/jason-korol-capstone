import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { id: number } }) {
  try {

    const symbols = await db("symbols")
      .where("symbols.user_id", params.id)

    return Response.json(symbols);
  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
