"use server";

import { getSession } from "@/lib/auth";

export async function messagesAction(messageId: any): Promise<string> {
  const { userId } = await getSession();
  const res = await fetch(`${process.env.API_URL}/users/${userId}/messages/${messageId}`, { cache: "no-cache" });
  const json = await res.json()
  return json;
};
