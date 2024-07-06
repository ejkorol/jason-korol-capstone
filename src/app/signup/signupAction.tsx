"use server";

import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export default async function loginAction(formData: any): Promise<string> {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/auth/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
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
