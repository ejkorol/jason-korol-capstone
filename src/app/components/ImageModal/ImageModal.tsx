import {
  Modal,
  ModalContent,
  Image,
} from "@nextui-org/react";

interface SymbolImageModalProps {
  isOpen: boolean | undefined;
  onOpenChange: (isOpen: boolean) => void;
  onClose?: () => void;
  item: string | undefined
}

export default function ImageModal({ isOpen, onOpenChange, item }: SymbolImageModalProps){
  return (
    <Modal motionProps={{
      variants: {
        enter: {
          y: 0,
          opacity: 1,
          transition: {
            duration: 0.3,
            ease: "easeOut",
          },
        },
        exit: {
          y: -25,
          opacity: 0,
          transition: {
            duration: 0.2,
            ease: "easeIn",
          }
        }
      }
    }} backdrop="blur" size="lg" className="m-6" placement="center" hideCloseButton isOpen={isOpen} onOpenChange={onOpenChange}>
      <ModalContent className="flex justify-center items-center content-center">
        <Image removeWrapper radius="sm" shadow="sm" src={item} />
      </ModalContent>
    </Modal>
  );
};
