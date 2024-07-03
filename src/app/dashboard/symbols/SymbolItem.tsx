"use client";
import { Image } from "@nextui-org/react";
import { Symbol } from "@/types/dashboard";

interface SymbolItemProps {
  symbol: Symbol;
  setSelected: Function;
  onOpenChange: Function;
};

export default function SymbolItem({symbol: { symbol_name, id, symbol_image }, setSelected, onOpenChange}: SymbolItemProps) {

  function handleClick() {
    setSelected(id);
    onOpenChange();
  };

  return (
    <article className="flex p-6 items-center gap-4 cursor-pointer" onClick={handleClick}>
      <div><Image isBlurred width={45} className="aspect-square object-cover" radius="sm" src={symbol_image}/></div>
      <div><p className="text-xl tracking-wide">{symbol_name}</p></div>
    </article>
  );
};
