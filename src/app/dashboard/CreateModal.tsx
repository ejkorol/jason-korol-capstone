import {
  Button,
  Spacer,
  Chip,
  Textarea,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { experimental_useObject as useObject } from "ai/react";
import { useState, useEffect } from "react";
import { dreamSchema } from "@/app/api/dreams/dreamSchema";
import useGreeting from "@/utils/hooks/useGreeting";
import StreamingText from "@/app/components/StreamingText/StreamingText";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";

interface CreateModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  onClose: () => void;
}

export default function CreateModal({ isOpen, onClose, onOpenChange }: CreateModalProps) {

  const router = useRouter();
  const [ dream, setDream ] = useState({
    context: "",
  });
  const { date } = useGreeting();
  const { object, submit, isLoading, error } = useObject({
    api: '/api/dreams',
    schema: dreamSchema
  });

  useEffect(() => {
    if (error) {
      toast.error("Something went wrong...");
    }
    if (isLoading) {
      toast.loading("Analyzing...", {
        id: "loading"
      })
    } else {
      toast.dismiss("loading")
    }
  }, [isLoading]);

  async function handleClose() {
    router.refresh();
    router.prefetch("/dashboard/symbols")
    onClose();
  };

  return (
    <Modal shouldBlockScroll={false} hideCloseButton isDismissable={false} backdrop="blur" radius="md" shadow="sm" isOpen={isOpen} onOpenChange={onOpenChange}>
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
              <Textarea minRows={20} value={dream.context} onChange={(e) => { setDream({context: e.target.value}) }} size="lg" fullWidth label="What did you dream about?" />
            )}
            {object?.analysis && (
              <>
                <Textarea minRows={20} readOnly value={object.analysis.dream_analysis} size="lg" fullWidth label="What did you dream about?" />
                <Spacer y={4} />
                <h3 className="mb-2">The symbols in your dream</h3>
                <div className="flex flex-wrap gap-4">
                  {object.analysis.dream_symbols && object.analysis.dream_symbols?.map((symbol, index) => {
                    return <Chip key={index} className="text-sm" variant="shadow" radius="full" size="md">{symbol?.symbol_name}</Chip>
                  })}
                </div>
                <Spacer y={4} />
                <h3>What you described</h3>
                <StreamingText text={dream.context} speed={15} />
              </>
            )}
          </div>
        </ModalBody>
        <ModalFooter>
          <div className="flex flex-row w-full justify-between">
            <div className="flex">
              {!isLoading && object?.analysis && (
                <Button onPress={handleClose} isIconOnly variant="light" size="lg">{`<--`}</Button>
              )}
              {!object?.analysis && (
                <Button onPress={handleClose} isIconOnly variant="light" size="lg">{`<--`}</Button>
              )}
            </div>
            <div className="flex">
              {!object?.analysis && (
                <Button variant="light" color="success" size="lg" onClick={() => { submit(dream) }}>{`Add to Journal -->`}</Button>
              )}
              {object?.analysis && (
                <Button variant="light" size="lg">View dream</Button>
              )}
            </div>
          </div>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};
