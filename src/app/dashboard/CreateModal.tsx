'use client';
import {
  Button,
  Spacer,
  Input,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import ArrowLeft from "@/app/icons/ArrowLeftIcon";
import ArrowRight from "@/app/icons/ArrowRightIcon";

export default function createModal(props: object) {
  return (
    <Modal hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <h1 className="text-3xl tracking-wide font-light">How did you sleep?</h1>
            <Spacer y={2}/>
            <h2 className="text-md tracaking-wide font-light">Wednesday, April 3<span className="">rd</span></h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="mt-8 w-full">
            <Textarea minRows={20} size="lg" fullWidth label="What did you dream about?" placeholder="Write down as much as you can remember, including your emotion and how the dream made you feel."/>
            <Spacer y={4}/>
            <Input fullWidth size="lg" label="Do you remember any symbols?"/>
            <Spacer y={4}/>
            <Input fullWidth size="lg" label="How was your quality of sleep?"/>
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              <Button isIconOnly variant="light" size="lg"><ArrowLeft color="#bdbdbd" size={18} stroke={1.5}/></Button>
            </div>
            <div className="flex">
              <Button variant="light" size="lg" endContent={ <ArrowRight color="#212121" size={18} stroke={1.5}/> }>Add to Journal</Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
};
