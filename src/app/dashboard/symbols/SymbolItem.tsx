import { Image } from "@nextui-org/react";
import { Symbol } from "@/types/dashboard";

interface SymbolItemProps {
  symbol: Symbol;
}

export default async function SymbolItem({symbol: { symbol_name }}: SymbolItemProps) {
  return (
    <div className="flex items-center gap-4 mb-4">
      <div><Image isBlurred width={45} className="aspect-square object-cover" radius="sm" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/></div>
      <div><p className="text-xl tracking-wide">{symbol_name}</p></div>
    </div>
  );
};
