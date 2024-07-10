import MoonLogo from "@/app/icons/MoonLogo";
import StarryBackground from "@/app/components/StarryBackground/StarryBackground";
import { getSession } from "@/lib/auth";

import {
  Button,
  Link
} from "@nextui-org/react";

export default async function Home() {

  const isLoggedIn = await getSession();

  return (
    <section className="flex w-screen h-screen items-center justify-center">
      <div><StarryBackground/></div>
      <div className="flex h-full w-screen">
        <main className="flex h-full justify-center p-8 flex-col">
          <div><MoonLogo size={80}/></div>
          <h1 className="text-4xl mt-4 tracking-wide">Why hello there,</h1>
          <h2 className="text-2xl mt-2 mb-8 tracking-wide font-light">Welcome to Lucid</h2>
          <p className="font-extralight text-md">Lucid helps you gain clarity and understanding of your dreams, empowering you to explore your subconscious mind and uncover hidden insights in your waking day.</p>
          <div className="flex gap-4 mt-8">
            {isLoggedIn 
              ? <>
                  <Button href="/dashboard" color="secondary" as={Link} variant="shadow" size="lg" radius="full" className="text-sm">Go to dashboard</Button>
                </>
              : <>
                  <Button href="/signup" color="secondary" as={Link} variant="shadow" size="lg" radius="full" className="text-sm">{`Let's Get Started -->`}</Button>
                  <Button href="/login" color="default" as={Link} size="lg" radius="full" className="text-sm" variant="light">Login Instead</Button>
                </>
            }
          </div>
        </main>
      </div>
   </section>
  );
};
