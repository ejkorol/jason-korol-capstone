"use client";
import {
  Input,
  Button,
  Spacer
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";
import CreateMessageModal from "@/app/dashboard/friends/CreateMessageModal";

import SearchIcon from "@/app/icons/SearchIcon";
import EditIcon from "@/app/icons/EditIcon";

export default function Search({handleSearch}: any) {

  const createMessageModal = useDisclosure();
  const [ query, setQuery ] = useState("");

  function handleQuery(e: any) {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className="flex w-full pl-6 pr-6">
      <Input color="default" value={query} onChange={handleQuery} size="lg" radius="lg" variant="flat" placeholder="Search anything"
        startContent={
          <SearchIcon size={20} stroke={1.5}/>
        }
      />
      <Spacer x={4}/>
      <Button onClick={createMessageModal.onOpen} color="secondary" isIconOnly size="lg" radius="lg" variant="shadow"><EditIcon size={24} stroke={1.5} /></Button>
      <CreateMessageModal isOpen={createMessageModal.isOpen} onClose={createMessageModal.onClose} onOpenChange={createMessageModal.onOpenChange} />
    </div>
  );
};
