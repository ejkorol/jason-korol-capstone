import db from "@/lib/db-instance";
import bcrypt from "bcrypt";

const saltRounds = 10;

export async function POST(req: Request) {
  try {
    const user = await req.json();

    const existingUser = await db("users").where({ email: user.email }).first();
    if (existingUser) {
      return new Response("User already exists.", {
        headers: { "Content-Type": "application/json" },
        status: 409
      });
    };

    const newUser = {
      username: user.username,
      first_name: user.firstName,
      last_name: user.lastName,
      email: user.email,
      password: await bcrypt.hash(user.password, saltRounds),
      mbti: user.mbti,
      dob_date: user.dobDate,
      dob_time: user.dobTime,
      dob_location: user.dobLocation,
      display_pic: null
    };
    const [newUserId] = await db("users").insert(newUser);

    const createdUser = await db("users").where({
      id: newUserId
    });

    return new Response(JSON.stringify(createdUser), {
      headers: { "Content-Type": "application/json" },
      status: 201
    });

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
