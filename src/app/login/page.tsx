"use client";
import {
  Input,
  Button,
  Link
} from "@nextui-org/react";
import { useFormState } from "react-dom";
import loginAction from "@/app/login/loginAction";

export default function Login() {

  const [error, formAction] = useFormState(loginAction, undefined);


  return (
    <section className="flex flex-col h-screen w-screen justify-center">
      <form className="p-6 flex flex-col gap-4" action={formAction}>
        <h1 className="text-4xl mb-4 tracking-wide">Welcome back,<br/>sleepy head.</h1>
        {error && <p>{error}</p>}
        <Input fullWidth size="lg" name="email" type="email" label="Email" />
        <Input fullWidth size="lg" name="password" type="password" label="Password" />
        <div className="flex mt-4 gap-4 justify-between">
          <Button size="md" variant="light" href="/signup" as={Link}>Signup instead</Button>
          <Button size="md" type="submit" variant="shadow" radius="full">Login</Button>
        </div>
      </form>
    </section>
  );
};
