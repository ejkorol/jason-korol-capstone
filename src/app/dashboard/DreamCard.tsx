"use client";
import { Dream, Tag } from "@/types/dashboard";
import {
  Chip,
  Spacer,
  Card,
  CardBody
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import DreamModal from "@/app/dashboard/DreamModal";
import truncateText from "@/utils/truncateText";
import { format } from "date-fns";

interface DreamCardProps {
  dream: Dream;
};

export default function DreamCard({dream: {dream_title, dream_context, tags, created_at}}: DreamCardProps) {

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const truncatedContext = truncateText(dream_context, 200);

  return (
    <div className="mb-6 cursor-pointer">
      <Card radius="sm" shadow="none" style={{ backgroundColor: "#F4F4F5" }}>
        <CardBody onClick={onOpen}>
          <div className="flex flex-row justify-between items-center">
            <div><h2 className="text-xl tracking-wide">{dream_title}</h2></div>
            <div><p className="text-sm font-mono tracking-tight">{format(new Date(created_at), `HH:mm`)}</p></div>
          </div>
          <Spacer y={2}/>
          <div>
            <p className="text-sm tracking-wide font-light" style={{ color: "#616161" }}>{truncatedContext}</p>
          </div>
          <Spacer y={2}/>
          <div className="flex gap-2 flex-wrap">
          {tags.map((tag: Tag) => {
            return <Chip key={tag.id} className="text-sm" variant="shadow" radius="full" size="md" style={{ backgroundColor: "#212121", color: "#ffffff" }}>{tag.tag_name}</Chip>
          })}
          </div>
        </CardBody>
      </Card>
      <DreamModal isOpen={isOpen} onOpen={onOpen} onOpenChange={onOpenChange} />
    </div>
  );
};
