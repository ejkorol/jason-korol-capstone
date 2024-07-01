import { Dream } from "@/types/dashboard";
import { ScrollShadow } from "@nextui-org/react";
import DreamCard from "@/app/dashboard/DreamCard";

interface DreamFeedProps {
  dreams: Dream[];
};

export default function DreamFeed({ dreams }: DreamFeedProps) {
  return (
    <ScrollShadow hideScrollBar size={100} className="flex flex-col mt-12 w-full pl-6 pr-6">
      <div className="flex w-full mb-4">
        <h2 className="text-2xl tracking-wide font-light">Sun Mar 24</h2>
      </div>
      {dreams.map((dream: Dream) => {
        return <DreamCard key={dream.id} dream={dream} />
      })}
    </ScrollShadow>
  );
};
