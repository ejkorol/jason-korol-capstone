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
import { useDisclosure } from "@nextui-org/react";
import { useState, useEffect } from "react";
import { Symbol } from "@/types/dashboard";
import ImageModal from "@/app/components/ImageModal/ImageModal";

interface SymbolModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  symbolId: Number;
  onClose: () => void;
};

export default function SymbolModal({isOpen, onOpenChange, onClose, symbolId}: SymbolModalProps) {

  const [ symbol, setSymbol ] = useState<Symbol>();
  const imageModal = useDisclosure();

  useEffect(() => {
    async function fetchSymbol() {
      try {
        const res = await fetch(`/api/users/1/symbols/${symbolId}`);
        const data = await res.json();
        setSymbol(data);
      } catch (e) {
        console.error(e);
      };
    };
    if (symbolId) {
      fetchSymbol();
    };
  }, [symbolId]);

  return (
    <>
    <Modal hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <ImageModal item={symbol?.symbol_image} isOpen={imageModal.isOpen} onOpenChange={imageModal.onOpenChange} />
            <Image onClick={imageModal.onOpen} isBlurred width={60} className="aspect-square object-cover" radius="sm" src={symbol?.symbol_image}/>
            <h1 className="mt-4 text-3xl tracking-wide font-light">{symbol?.symbol_name}</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="w-full">
            <Textarea isReadOnly label="In your context" placeholder={symbol?.symbol_analysis} />
          </div>
          <div className="mt-4 w-full">
            <h2 className="mb-4">Appears in:</h2>
            <div className="flex flex-wrap gap-4">
              {symbol?.apperances.map((apperance) => {
                return <Chip key={apperance.dream_id} className="text-sm" color="default" variant="shadow" radius="full" size="md">{apperance.dream_title}</Chip>
              })}
            </div>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              <Button onPress={onClose} isIconOnly variant="light" size="lg">{`<--`}</Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
    </>
  );
};
