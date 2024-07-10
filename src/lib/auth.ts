"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import * as jose from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function decrypt(input: string): Promise<any> {
  const { payload } = await jose.jwtVerify(input, secret, {});
  return payload;
};

export async function getSession() {
  const session = cookies().get("Authorization")?.value;
  if (!session) return null;
  return await decrypt(session);
};

export async function getUser() {
  const session = await getSession();
  return session.user;
};

export async function removeSession() {
  cookies().delete("Authorization");
  return redirect("/");
};
