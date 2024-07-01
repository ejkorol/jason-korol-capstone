import { Dream, Tag } from "@/types/dashboard";
import { Chip } from "@nextui-org/react";
import { Spacer } from "@nextui-org/react";
import { Card, CardBody } from "@nextui-org/react";
import truncateText from "@/utils/truncateText";
import { format } from "date-fns";

interface DreamCardProps {
  dream: Dream;
};

export default async function DreamCard({dream: {dream_title, dream_context, tags, created_at}}: DreamCardProps) {

  const truncatedContext = truncateText(dream_context, 200);

  return (
    <div className="h-full w-full mb-6">
      <Card radius="sm" shadow="none" style={{ backgroundColor: "#F4F4F5" }}>
        <CardBody>
          <div className="flex flex-row justify-between items-center">
            <div><h2 className="text-xl tracking-wide">{dream_title}</h2></div>
            <div><p className="text-sm font-mono tracking-tight">{format(new Date(created_at), `HH:mm`)}</p></div>
          </div>
          <Spacer y={2}/>
          <div>
            <p className="text-sm tracking-wide font-light" style={{ color: "#616161" }}>{truncatedContext}</p>
          </div>
          <Spacer y={2}/>
          <div className="flex gap-2">
          {tags.map((tag: Tag) => {
            return <Chip key={tag.id} className="text-sm" variant="shadow" radius="full" size="md" style={{ backgroundColor: "#212121", color: "#ffffff" }}>{tag.tag_name}</Chip>
          })}
          </div>
        </CardBody>
      </Card>
    </div>
  );
};
