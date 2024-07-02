"use client";
import {
  Input,
  Button,
  Spacer
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";

import SearchIcon from "@/app/icons/SearchIcon";
import EditIcon from "@/app/icons/EditIcon";

import CreateModal from "@/app/dashboard/CreateModal";

function DashboardSearch() {

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();

  return (
    <div className="flex w-full pl-6 pr-6">
      <Input size="lg" radius="lg" variant="flat" placeholder="Search for your dreams" startContent={<SearchIcon size="20px" color="#bdbdbd" stroke="1.5px"/>} style={{ color: "#bdbdbd" }}/>
      <Spacer x={4}/>
      <Button onPress={onOpen} isIconOnly size="lg" radius="lg" style={{ backgroundColor: "#212121" }}><EditIcon size="24px" color="#ffffff" stroke="1.5px"/></Button>
      <CreateModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </div>
  )
};

export default DashboardSearch;
