"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function loginAction(currentState: any, formData: FormData): Promise<string> {
  const email = formData.get("email");
  const password = formData.get("password");

  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const json = await res.json();


  if (res.ok) {
    cookies().set("Authorization", json.token, {
      secure: true,
      httpOnly: true,
      path: "/",
      sameSite: "strict",
    });
  } else {
    return json.error
  };

  redirect("/dashboard");

};
