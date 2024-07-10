import db from "@/lib/db-instance";
import bcrypt from "bcrypt";
import { getSigns } from "@/utils/birthChart";
import * as jose from "jose";

const saltRounds = 10;

export async function POST(req: Request) {
  try {
    const user = await req.json();

    const existingUser = await db("users").where({ email: user.email }).first();
    if (existingUser) {
      return Response.json({ error: "User already exists" }, { status: 409 });
    };

    const signs = getSigns(user.dobDate, user.dobTime);

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
      sun_sign: signs.sunSign.name,
      moon_sign: signs.moonSign.name,
      display_pic: null
    };
    const [userId] = await db("users").insert(newUser);

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      userId: userId, email: newUser.email, user: newUser.first_name
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .sign(secret);

    return Response.json({ token });

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
