import MoonLogo from "@/app/icons/MoonLogo";

export default async function Journal(){

  const journalEntries = [];

  if (journalEntries.length <= 0) {
    return (
      <section className="h-[100vh]">
        <div className="h-[80%] flex flex-col items-center justify-center">
          <MoonLogo size={80}/>
          <h2 className="mt-6 text-lg text-neutral-300">Journal coming soon...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="flex flex-col h-full w-full fixed">
      <div className="flex flex-col p-6">
        <h1 className="text-4xl tracking-wide">Symbols</h1>
      </div>
    </section>
  );
};
