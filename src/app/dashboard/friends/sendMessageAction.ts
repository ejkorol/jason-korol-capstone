"use server";

import { getSession } from "@/lib/auth";

export default async function sendMessageAction(formData: any): Promise<string> {
  const { userId } = await getSession();
  const { recipientId, message } = formData;

  const payload = {
    recipient_id: recipientId,
    content: message
  };

  const res = await fetch(`${process.env.API_URL}/users/${userId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
    cache: "no-cache"
  });

  const json = await res.json();

  if (!res.ok) {
    return "Error";
  };

  return json
};
