import SymbolFeed from "@/app/dashboard/symbols/SymbolFeed";
import { Symbol } from "@/types/dashboard";
import { getSession } from "@/lib/auth";

async function fetchSymbols(): Promise<Symbol[]> {
  try {
    const session = await getSession();
    const res = await fetch(`${process.env.API_URL}/users/${session.userId}/symbols`, { cache: 'no-cache' });
    if (!res.ok) {
      throw new Error("Failed to fetch");
    };
    return res.json();
  } catch (err: any) {
    throw new Error(err);
  };
};

export default async function Symbols() {
  const symbols = await fetchSymbols();
  return (
    <section className="flex flex-col h-full w-full fixed">
      <div className="flex flex-col p-6">
        <h1 className="text-4xl tracking-wide">Symbols</h1>
      </div>
      <SymbolFeed symbols={symbols} />
    </section>
  );
};
