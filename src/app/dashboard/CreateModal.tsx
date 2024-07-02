"use client";
import {
  Button,
  Spacer,
  Input,
  Chip,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "@nextui-org/react";
import ArrowLeft from "@/app/icons/ArrowLeftIcon";
import ArrowRight from "@/app/icons/ArrowRightIcon";
import { experimental_useObject as useObject } from "ai/react";
import { useState } from "react";
import { dreamSchema } from "@/app/api/dreams/dreamSchema";
import useGreeting from "@/utils/hooks/useGreeting";

export default function CreateModal(props: object) {

  const [ dream, setDream ] = useState({
    context: "",
    userId: 1
  });
  const { date } = useGreeting();
  const { object, submit } = useObject({
    api: '/api/dreams',
    schema: dreamSchema
  });

  return (
    <Modal hideCloseButton backdrop="blur" radius="md" shadow="sm" isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
      <ModalContent>
        <ModalHeader>
          <div className="mt-4 flex flex-col">
            <h1 className="text-3xl tracking-wide font-light">
              {!object?.analysis && ("Sleep sunked?")}
              {object?.analysis && (`${object.analysis.dream_title}`)}
            </h1>
            <Spacer y={2}/>
            <h2 className="text-md tracaking-wide font-light">{date}</h2>
          </div>
        </ModalHeader>
        <ModalBody>
          <div className="mt-8 w-full">
            {!object?.analysis && (
              <Textarea minRows={20} value={dream.context} onChange={(e) => { setDream({
                context: e.target.value,
                userId: 1
              }) }} size="lg" fullWidth label="What did you dream about?" />
            )}
            {object?.analysis && (
              <>
                <Textarea minRows={20} readOnly value={object.analysis.dream_analysis} size="lg" fullWidth label="What did you dream about?" />
                <Spacer y={4} />
                <h3>The symbols in your dream</h3>
                {object.analysis.dream_symbols?.split(",").forEach((symbol) => {
                  <Chip className="text-sm" variant="shadow" radius="full" size="md">{symbol}</Chip>
                })}
                <Spacer y={4} />
                <h3>What you described</h3>
                <p className="text-sm text-neutral-500">{dream.context}</p>
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              <Button isIconOnly variant="light" size="lg"><ArrowLeft color="#bdbdbd" size={18} stroke={1.5}/></Button>
            </div>
            <div className="flex">
              <Button variant="light" size="lg" onClick={() => { submit(dream) }} endContent={ <ArrowRight color="#212121" size={18} stroke={1.5}/> }>Add to Journal</Button>
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
