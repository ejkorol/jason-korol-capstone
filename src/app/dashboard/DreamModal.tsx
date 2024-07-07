import { Dream, Tag, Symbol } from "@/types/dashboard";
import {
  Button,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Chip,
  Image,
  ScrollShadow
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { format } from "date-fns";

interface DreamModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  dreamId: number | undefined;
  onClose: () => void;
}

export default function DreamModal({isOpen, onOpenChange, onClose, dreamId}: DreamModalProps) {

  const [ dream, setDream ] = useState<Dream>();
  const [ mounted, setMounted ] = useState(false);


  async function fetchData() {
    try {
      const res = await fetch(`/api/users/1/dreams/${dreamId}`);
      const data = await res.json();
      setDream(data);
    } catch (e) {
      console.error(e);
    };
  };

  useEffect(() => {
    setMounted(true);
    if (mounted) {
      fetchData();
    };
  }, [dreamId, isOpen]);

  if (dream) {
  return (
    <Modal hideCloseButton scrollBehavior="inside" backdrop="blur" radius="md" shadow="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col w-full">
            <Image src={dream?.dream_image} isBlurred width={100} className="aspect-square object-cover" radius="sm"/>
            <h1 className="mt-4 text-3xl tracking-wide font-light">{dream?.dream_title}</h1>
            <div className="flex mt-2 justify-between">
              <p className="font-mono text-sm font-light text-neutral-400">{format(new Date(`${dream?.created_at}`), "iiii, MMMM do")}</p>
              <p className="font-mono text-sm font-light text-neutral-400">{format(new Date(`${dream?.created_at}`), "HH:mm")}</p>
            </div>
          </div>
        </ModalHeader>
        <ModalBody>
            <ScrollShadow size={100}>
          <div className="w-full">
            <Textarea isReadOnly minRows={20} label="In your context" placeholder={dream?.dream_analysis}/>
          </div>
          <div className="mt-4 w-full">
            <h2 className="mb-4">What you described</h2>
            <p className="text-sm text-neutral-500">{dream?.dream_context}</p>
          </div>
          <div className="mt-4 w-full">
            <h2 className="mb-4">Symbols:</h2>
              <div className="flex flex-wrap gap-4">
                {dream.symbols.map((symbol: Symbol) => {
                  return <Chip key={symbol.symbol_id} className="text-sm" variant="shadow" radius="full" size="md" color="primary">{symbol.symbol_name}</Chip>
                })}
              </div>
          </div>
          <div className="mt-4 w-full">
            <h2 className="mb-4">Tags:</h2>
              <div className="flex flex-wrap gap-4">
                {dream.tags.map((tag: Tag) => {
                  return <Chip key={tag.tag_id} className="text-sm" color="primary" variant="flat" radius="full" size="md">{tag.tag_name}</Chip>
                })}
              </div>
          </div>
        </ScrollShadow>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              <Button isIconOnly onClick={onClose} variant="light" size="lg">{`<--`}</Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
}
