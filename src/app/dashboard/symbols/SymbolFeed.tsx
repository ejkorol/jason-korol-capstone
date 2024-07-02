import SymbolItem from "@/app/dashboard/symbols/SymbolItem";
import { Symbol } from "@/types/dashboard";

interface SymbolFeedProps {
  symbols: Symbol[]
};

export default async function ({symbols}: SymbolFeedProps) {

  console.log(symbols)
  // Sort symbols alphabetically by symbol_name
  const sortedSymbols = symbols.sort((a, b) =>
    a.symbol_name.toLowerCase() > b.symbol_name.toLowerCase() ? 1 : -1
  );

  // Group symbols by their first letter
  const groupedSymbols: { [key: string]: Symbol[] } = {};
  sortedSymbols.forEach((symbol) => {
    const firstLetter = symbol.symbol_name.charAt(0).toUpperCase();
    if (!groupedSymbols[firstLetter]) {
      groupedSymbols[firstLetter] = [];
    }
    groupedSymbols[firstLetter].push(symbol);
  });

  return (
    <div className="mt-6">
      {Object.keys(groupedSymbols).sort().map((letter) => (
        <div key={letter}>
          <h3 className="font-mono mb-4 mt-8">{letter}</h3>
          {groupedSymbols[letter].map((symbol) => (
            <SymbolItem key={symbol.id} symbol={symbol} />
          ))}
        </div>
      ))}
    </div>
  );
};
