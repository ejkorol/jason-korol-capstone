import db from "@/lib/db-instance";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const secretKey: string = process.env.JWT_SECRET ?? '';

if (!process.env.JWT_SECRET) {
  throw new Error("JWT_SECRET env variable has not been set.");
};

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return new Response("Missing parameters", {
        headers: { "Content-Type": "application/json" },
        status: 400
      });
    };

    const user = await db("users").where({ email }).first();
    if (!user) {
      return new Response("Invalid email or password", {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    };

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return new Response("Invalid email or password", {
        headers: { "Content-Type": "application/json" },
        status: 401
      });
    };

    const token = jwt.sign(
      { userId: user.id, email: user.email },
      secretKey,
      { expiresIn: "1h" }
    );

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
      status: 200,
    });

  } catch (e: any) {
    return new Response(e.message, { status: 500 });
  };
};
