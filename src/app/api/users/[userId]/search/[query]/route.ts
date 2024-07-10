import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { query: string, userId: number } }) {
  try {
    const foundUsers = await db("users")
      .where("users.username", "like", `%${params.query}%`)
      .andWhere("users.id", "<>", params.userId)
      .select(
        "users.id",
        "users.username",
        "users.first_name",
        "users.last_name"
      );

    if (foundUsers.length > 0) {
      return new Response(JSON.stringify(foundUsers), { status: 200, headers: { "Content-Type": "application/json" } });
    } else {
      return;
    }
  } catch (e: any) {
    return new Response(JSON.stringify({ error: e.message }), { status: 500, headers: { "Content-Type": "application/json" } });
  }
};
