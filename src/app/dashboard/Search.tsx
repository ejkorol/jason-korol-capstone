import {
  Input,
  Button,
  Spacer
} from "@nextui-org/react";
import { useDisclosure } from "@nextui-org/react";
import { useState } from "react";

import SearchIcon from "@/app/icons/SearchIcon";
import EditIcon from "@/app/icons/EditIcon";

import CreateModal from "@/app/dashboard/CreateModal";

interface SearchProps {
  handleSearch: (query: string) => void;
}

export default function Search({ handleSearch }: SearchProps) {

  const { isOpen, onOpen, onClose, onOpenChange } = useDisclosure();
  const [ query, setQuery ] = useState("")

  function handleQuery(e: any) {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  };

  return (
    <div className="flex w-full pl-6 pr-6">
      <Input value={query} onChange={handleQuery} size="lg" radius="lg" variant="flat" placeholder="Search for your dreams"
        startContent={
          <SearchIcon size={20} color="#bdbdbd" stroke={1.5}/>
        }
      />
      <Spacer x={4}/>
      <Button onPress={onOpen} isIconOnly size="lg" radius="lg" style={{ backgroundColor: "#212121" }}><EditIcon size={24} color="#ffffff" stroke={1.5}/></Button>
      <CreateModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </div>
  );
};
