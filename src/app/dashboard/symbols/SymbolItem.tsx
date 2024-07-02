"use client";
import { Image } from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { Symbol } from "@/types/dashboard";
import SymbolModal from "@/app/dashboard/symbols/SymbolModal";

interface SymbolItemProps {
  symbol: Symbol;
}

export default function SymbolItem({symbol: { symbol_name }}: SymbolItemProps) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
    <div className="flex items-center gap-4 mb-4 cursor-pointer" onClick={onOpen}>
      <div><Image isBlurred width={45} className="aspect-square object-cover" radius="sm" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/></div>
      <div><p className="text-xl tracking-wide">{symbol_name}</p></div>
    </div>
      <SymbolModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </>
  );
};
