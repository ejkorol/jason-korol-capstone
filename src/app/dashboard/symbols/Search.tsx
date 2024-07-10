import { Input } from "@nextui-org/react";
import SearchIcon from "@/app/icons/SearchIcon";
import { useState } from "react";

interface SearchProps {
  handleSearch: (query: string) => void;
};

export default function Search({ handleSearch }: SearchProps) {

  const [ query, setQuery ] = useState("");

  function handleQuery(e: any) {
    setQuery(e.target.value);
    handleSearch(e.target.value);
  }

  return (
    <div className="flex w-full pl-6 pr-6">
      <Input value={query} onChange={handleQuery} size="lg" radius="lg" variant="flat" placeholder="Search symbols"
        startContent={
          <SearchIcon size={20} stroke={1.5} />
        }
      />
    </div>
  );
};
