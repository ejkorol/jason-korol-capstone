import {
  Button,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Image
} from "@nextui-org/react";
import ArrowLeft from "@/app/icons/ArrowLeftIcon";
import { useState, useEffect } from "react";
import { Symbol } from "@/types/dashboard";

interface SymbolModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  symbolId: Number;
};

export default function SymbolModal({isOpen, onOpenChange, symbolId}: SymbolModalProps) {

  const [ symbol, setSymbol ] = useState<Symbol>();

  useEffect(() => {
    async function fetchSymbol() {
      try {
        const res = await fetch(`/api/users/1/symbols/${symbolId}`);
        const data = await res.json();
        setSymbol(data[0]);
      } catch (e) {
        console.error(e);
      };
    };
    if (symbolId) {
      fetchSymbol();
    };
  }, [symbolId]);

  return (
    <Modal hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <Image isBlurred width={60} className="aspect-square object-cover" radius="sm" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/>
            <h1 className="mt-4 text-3xl tracking-wide font-light">{symbol?.symbol_name}</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="w-full">
            <Textarea isReadOnly label="In your context" placeholder={symbol?.symbol_analysis} />
          </div>
          <div className="mt-4 w-full">
            <h2 className="mb-4">Appears in:</h2>
            <Chip className="text-sm" variant="shadow" radius="full" size="md" style={{ backgroundColor: "#212121", color: "#ffffff" }}>some dream</Chip>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              <Button isIconOnly variant="light" size="lg"><ArrowLeft color="#bdbdbd" size={18} stroke={1.5}/></Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
