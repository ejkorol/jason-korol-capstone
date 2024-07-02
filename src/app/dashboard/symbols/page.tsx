import SymbolFeed from "@/app/dashboard/symbols/SymbolFeed";
import { Symbol } from "@/types/dashboard";

async function fetchSymbols(): Promise<Symbol[]> {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/users/symbols/1`, { cache: 'no-cache' } );
  if (!res.ok) {
    throw new Error('Failed to fetch');
  };

  return res.json();
};

export default async function Symbols() {
  const symbols = await fetchSymbols();
  return (
    <section className="flex flex-col h-full w-full fixed">
      <h1 className="text-4xl tracking-wide pl-6">Symbols</h1>
      <SymbolFeed symbols={symbols} />
    </section>
  );
};
