import MoonLogo from "@/app/icons/MoonLogo";

export default async function Journal(){
  return (
      <section className="h-[100vh]">
      <div className="h-[80%] flex flex-col items-center justify-center">
        <MoonLogo size={80}/>
        <h2 className="mt-6 text-lg text-neutral-300">Journal coming soon...</h2>
      </div>
      </section>
  );
};
