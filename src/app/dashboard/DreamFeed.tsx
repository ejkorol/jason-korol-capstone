import { Dream } from "@/types/dashboard";
import { ScrollShadow } from "@nextui-org/react";
import DreamCard from "@/app/dashboard/DreamCard";
import { format, isSameDay } from "date-fns";
import MoonLogo from "@/app/icons/MoonLogo";

interface DreamFeedProps {
  dreams: Dream[];
};

export default async function DreamFeed({ dreams }: DreamFeedProps) {

  const sortedDreams = [...dreams].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (dreams.length <= 0) {
    return (
      <div className="h-[60%] flex flex-col items-center justify-center">
        <MoonLogo size={80} color="#D9D9D9" />
        <h2 className="mt-6 text-lg text-neutral-300">Sleep not yet sunked...</h2>
      </div>
    );
  };

  return (
    <ScrollShadow hideScrollBar size={100} className="flex flex-col mt-12 w-full pl-6 pr-6">
      {sortedDreams.map((dream, index) => (
        <div key={dream.id} className="">
          {(index === 0 || !isSameDay(new Date(sortedDreams[index - 1].created_at), new Date(dream.created_at))) && (
            <h2 className="text-2xl tracking-wide mb-4">{format(new Date(dream.created_at), "iii MMM dd")}</h2>
          )}
          <DreamCard key={dream.id} dream={dream} />
        </div>
      ))}
    </ScrollShadow>
  );
};
