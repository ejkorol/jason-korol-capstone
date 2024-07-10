"use client"
import { Avatar } from "@nextui-org/react";
import Search from "@/app/dashboard/friends/Search";
import ButtonNavigation from "@/app/dashboard/friends/ButtonNavigation";
import MoonLogo from "@/app/icons/MoonLogo";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function MessageFeed({messages, session}: any) {

  const router = useRouter();
  const [ filteredMessages, setFilteredMessages ] = useState(messages);
  const [ setQuery ] = useState("");

  function handleSearch(query: string) {
    const filtered = messages.filter((message: any) =>
      message.recipient_name.toLowerCase().includes(query.toLowerCase()) ||
      message.recipient_username.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredMessages(filtered);
  };


  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  if (!messages) {
    return (
      <>
      <Search />
      <ButtonNavigation />
      <div className="h-[60%] flex flex-col items-center justify-center">
        <MoonLogo size={80}/>
      </div>
      </>
    );
  };

  function handleClick(id: number) {
    router.push(`/dashboard/friends/messages/${id}`);
  };

  return (
    <>
    <Search session={session} handleSearch={handleSearch} setQuery={setQuery} />
    <ButtonNavigation />
    <section className="flex w-full p-6 gap-6">
      <div className="flex gap-4 w-full flex-col justify-between">
        {filteredMessages.map((message: any) => <div className="flex justify-between" key={message.message_id} onClick={() => handleClick(message.message_id)}>
        <div className="flex gap-6 items-center">
          <Avatar size="lg" radius="lg"/>
          <div className="flex flex-col">
            <h3 className="text-lg tracking-wide capitalize">{message.recipient_name}</h3>
            <p className="text-md text-neutral-500">{message.content}</p>
          </div>
        </div>
        <div><p className="text-sm font-mono tracking-wide text-neutral-500">{formatTime(message.created_at)}</p></div>
          </div>)}
      </div>
    </section>
    </>
  );
};
