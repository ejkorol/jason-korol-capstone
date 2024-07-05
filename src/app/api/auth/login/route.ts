import db from "@/lib/db-instance";
import bcrypt from "bcrypt";
import * as jose from "jose";

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET env variable has not been set.");
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return Response.json(
        {
          error: "Missing parameters",
        },
        { status: 400 }
      );
    };

    const user = await db("users").where({ email }).first();
    if (!user) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return Response.json(
        {
          error: "Invalid email or password",
        },
        { status: 400 }
      );
    };

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    const token = await new jose.SignJWT({
      userId: user.id, email: user.email, user: user.first_name
    })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("72h")
      .sign(secret);

    return Response.json({ token });

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
