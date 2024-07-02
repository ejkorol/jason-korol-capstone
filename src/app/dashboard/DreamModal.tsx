import { Dream } from "@/types/dashboard";
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

interface DreamModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  dreamId: number | undefined;
}

export default function DreamModal({isOpen, onOpenChange, dreamId}: DreamModalProps) {

  const [ dream, setDream ] = useState<Dream>();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/users/1/dreams/${dreamId}`);
        const data = await res.json();
        setDream(data);
      } catch (e) {
        console.error(e);
      };
    };
    if (dreamId) {
      fetchData();
    };
  }, [dreamId]);

  if (!dream) return <p>loading...</p>

  return (
    <Modal size="full" hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <Image src={dream?.dream_image} isBlurred className="aspect-square object-cover" radius="sm"/>
            <h1 className="mt-4 text-3xl tracking-wide font-light">{dream?.dream_title}</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="w-full">
            <Textarea isReadOnly minRows={20} label="In your context" placeholder={dream?.dream_context}/>
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
