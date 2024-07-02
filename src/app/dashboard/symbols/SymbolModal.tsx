"use client";
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

export default function SymbolModal(props: any) {
  return (
    <Modal hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <Image isBlurred width={60} className="aspect-square object-cover" radius="sm" src="https://nextui-docs-v2.vercel.app/images/hero-card-complete.jpeg"/>
            <h1 className="mt-4 text-3xl tracking-wide font-light">Book</h1>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="w-full">
            <Textarea readOnly minRows={20} size="lg" fullWidth label="In your context" placeholder="This is where the information about this symbol will appear in the context of the user"/>
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
