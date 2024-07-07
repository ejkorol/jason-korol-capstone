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
      <Input color="default" value={query} onChange={handleQuery} size="lg" radius="lg" variant="flat" placeholder="Search your dreams"
        startContent={
          <SearchIcon size={20} color="#bdbdbd" stroke={1.5}/>
        }
      />
      <Spacer x={4}/>
      <Button color="secondary" onPress={onOpen} isIconOnly size="lg" radius="lg" variant="shadow"><EditIcon size={24} stroke={1.5} /></Button>
      <CreateModal isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} />
    </div>
  );
};
