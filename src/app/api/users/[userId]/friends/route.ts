import db from "@/lib/db-instance";

export async function GET(_req: Request, { params }: { params: { userId: number } }) {
  try {
    const friends = await db("friends_list")
      .join("users", "friends_list.friend_id", "=", "users.id")
      .where({ "friends_list.user_id": params.userId })
      .select(
        "friends_list.id",
        "friends_list.user_id",
        "friends_list.friend_id",
        "friends_list.status",
        "friends_list.updated_at",
        "users.first_name",
        "users.username"
      );

    return new Response(JSON.stringify(friends), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
}

export async function POST(req: Request, { params }: { params: { userId: number } }) {
  try {
    const { friend_id } = await req.json();

    if (!friend_id) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const userPayload = {
      user_id: params.userId,
      friend_id,
      status: 'pending',
    };

    const friendPayload = {
      user_id: friend_id,
      friend_id: params.userId,
      status: 'pending',
    }

    await db("friends_list").insert(userPayload);
    await db("friends_list").insert(friendPayload);

    return new Response(JSON.stringify({ message: "Friend added" }), { status: 201, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};

export async function PATCH(req: Request, { params }: { params: { userId: number } }) {
  try {
    const { friend_id, action } = await req.json();

    if (!friend_id || !action) {
      return new Response(JSON.stringify({ error: "Missing parameters" }), { status: 400, headers: { 'Content-Type': 'application/json' } });
    }

    const newStatus = action === 'accept' ? 'accepted' : 'declined';

    await db("friends_list")
      .where({ user_id: params.userId, friend_id })
      .orWhere({ user_id: friend_id, friend_id: params.userId })
      .update({ status: newStatus });

    return new Response(JSON.stringify({ message: `Friend request ${action}ed` }), { status: 200, headers: { 'Content-Type': 'application/json' } });
  } catch (e: any) {
    return new Response(JSON.stringify({ message: e.message }), { status: 500, headers: { 'Content-Type': 'application/json' } });
  }
};
