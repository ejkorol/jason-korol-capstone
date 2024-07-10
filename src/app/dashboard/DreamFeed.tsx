"use client";
import { Dream } from "@/types/dashboard";
import { ScrollShadow } from "@nextui-org/react";
import DreamCard from "@/app/dashboard/DreamCard";
import { format, isSameDay } from "date-fns";
import MoonLogo from "@/app/icons/MoonLogo";
import { useDisclosure } from "@nextui-org/react";
import DreamModal from "@/app/dashboard/DreamModal";
import { useState, useEffect } from "react";
import Search from "@/app/dashboard/Search";

interface DreamFeedProps {
  dreams: Dream[];
};

export default function DreamFeed({ dreams }: DreamFeedProps) {

  const [ selected, setSelected ] = useState<any>();
  const { isOpen, onOpenChange, onClose } = useDisclosure();
  const [ filteredDreams, setFilteredDreams ] = useState(dreams);

  useEffect(() => {
    setFilteredDreams(dreams);
  },[dreams]);

  const handleSearch = (query: string) => {
    const filtered = dreams.filter(dream =>
      dream.dream_title.toLowerCase().includes(query.toLowerCase()) ||
      dream.dream_analysis.toLowerCase().includes(query.toLowerCase()) ||
      dream.dream_context.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredDreams(filtered);
  };

  const sortedDreams = [...filteredDreams].sort((a, b) => {
    return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
  });

  if (dreams.length <= 0) {
    return (
      <>
      <Search handleSearch={handleSearch}/>
      <div className="h-[60%] flex flex-col items-center justify-center">
        <MoonLogo size={80}/>
        <h2 className="mt-6 text-lg text-neutral-300">Sleep not yet sunked...</h2>
      </div>
      </>
    );
  };

  return (
    <>
    <Search handleSearch={handleSearch}/>
    <ScrollShadow hideScrollBar size={100} className="flex flex-col mt-12 w-full pl-6 pr-6 mb-36">
      {sortedDreams.map((dream, index) => (
        <div key={dream.id} className="">
          {(index === 0 || !isSameDay(new Date(sortedDreams[index - 1].created_at), new Date(dream.created_at))) && (
            <h2 className="text-2xl tracking-wide mb-4">{format(new Date(dream.created_at), "iii MMM dd")}</h2>
          )}
          <DreamCard key={dream.id} dream={dream} onOpenChange={onOpenChange} setSelected={setSelected} />
        </div>
      ))}
    </ScrollShadow>
    <DreamModal dreamId={selected} isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </>
  );
};
