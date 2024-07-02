"use client";
import { Image } from "@nextui-org/react";
import { Symbol } from "@/types/dashboard";

interface SymbolItemProps {
  symbol: Symbol;
  setSelected: Function;
  onOpenChange: Function;
};

export default function SymbolItem({symbol: { symbol_name, id }, setSelected, onOpenChange}: SymbolItemProps) {

  function handleClick() {
    setSelected(id)
    onOpenChange();
  };

  return (
    <article className="flex items-center gap-4 mb-8 cursor-pointer" onClick={handleClick}>
      <div><Image isBlurred width={45} className="aspect-square object-cover" radius="sm" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/></div>
      <div><p className="text-xl tracking-wide">{symbol_name}</p></div>
    </article>
  );
};
