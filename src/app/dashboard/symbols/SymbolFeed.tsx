"use client";
import SymbolItem from "@/app/dashboard/symbols/SymbolItem";
import SymbolModal from "@/app/dashboard/symbols/SymbolModal";
import Search from "@/app/dashboard/symbols/Search";
import { Symbol } from "@/types/dashboard";
import { useState } from "react";
import { ScrollShadow, useDisclosure } from "@nextui-org/react";
import MoonLogo from "@/app/icons/MoonLogo";

interface SymbolFeedProps {
  symbols: Symbol[]
};

export default function SymbolFeed({ symbols }: SymbolFeedProps) {
  const [selected, setSelected] = useState(0);
  const { isOpen, onClose, onOpenChange } = useDisclosure();
  const [filteredSymbols, setFilteredSymbols] = useState(symbols);

  const handleSearch = (query: string) => {
    const filtered = symbols.filter(symbol => 
      symbol.symbol_name.toLowerCase().includes(query.toLowerCase()) ||
      symbol.symbol_analysis.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredSymbols(filtered);
  };

  const sortedSymbols = filteredSymbols.sort((a, b) =>
    a.symbol_name.toLowerCase() > b.symbol_name.toLowerCase() ? 1 : -1
  );

  const groupedSymbols: { [key: string]: Symbol[] } = {};
  sortedSymbols.forEach((symbol) => {
    const firstLetter = symbol.symbol_name.charAt(0);
    if (!groupedSymbols[firstLetter]) {
      groupedSymbols[firstLetter] = [];
    }
    groupedSymbols[firstLetter].push(symbol);
  });

  if (symbols.length <= 0) {
    return (
      <div className="h-[80%] flex flex-col items-center justify-center">
        <MoonLogo size={80} color="#D9D9D9" />
        <h2 className="mt-6 text-lg text-neutral-300">Add a dream for new symbols...</h2>
      </div>
    );
  }

  return (
    <>
      <Search handleSearch={handleSearch} />
      <ScrollShadow hideScrollBar size={100} className="flex flex-col mt-8 w-full mb-36">
        {Object.keys(groupedSymbols).sort().map((letter) => (
          <div key={letter}>
            <h3 className="font-mono mb-4 mt-8 sticky top-0 pl-6 uppercase">{letter}</h3>
            {groupedSymbols[letter].map((symbol) => (
              <SymbolItem key={symbol.id} symbol={symbol} setSelected={setSelected} onOpenChange={onOpenChange} />
            ))}
          </div>
        ))}
        <SymbolModal onClose={onClose} symbolId={selected} isOpen={isOpen} onOpenChange={onOpenChange} />
      </ScrollShadow>
    </>
  );
}
