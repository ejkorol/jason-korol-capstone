"use client";
import SymbolItem from "@/app/dashboard/symbols/SymbolItem";
import SymbolModal from "@/app/dashboard/symbols/SymbolModal";
import { Symbol } from "@/types/dashboard";
import { useState } from "react";
import { useDisclosure } from "@nextui-org/react";

interface SymbolFeedProps {
  symbols: Symbol[]
};

export default function ({symbols}: SymbolFeedProps) {

  const [ selected, setSelected ] = useState(0);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  console.log(selected)

  const sortedSymbols = symbols.sort((a, b) =>
    a.symbol_name.toLowerCase() > b.symbol_name.toLowerCase() ? 1 : -1
  );

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
            <SymbolItem key={symbol.id} symbol={symbol} setSelected={setSelected} onOpenChange={onOpenChange} />
          ))}
        </div>
      ))}
      <SymbolModal symbolId={selected} isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
