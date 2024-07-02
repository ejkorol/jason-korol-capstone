import HomeIcon from "@/app/icons/HomeIcon";
import JournalIcon from "@/app/icons/JournalIcon";
import QuestionIcon from "@/app/icons/QuestionIcon";
import FriendsIcon from "@/app/icons/FriendsIcon";
import { Button, Link } from "@nextui-org/react";

export default async function Dock() {

  return (
    <div className="w-full fixed bottom-0">
      <div className="flex relative w-[90%] m-auto mb-4 rounded-lg flex-col backdrop-blur-lg bg-neutral-200/90 z-10">
        <div className="pb-4 pt-4 pl-4 pr-4 flex justify-between items-center">
          <div><Button as={Link} href="/dashboard" isIconOnly variant="light" size="lg" radius="full"><HomeIcon color="#212121" /></Button></div>
          <div><Button as={Link} href="/dashboard/symbols" isIconOnly variant="light" size="lg" radius="full"><JournalIcon color="#212121"/></Button></div>
          <div><Button isIconOnly variant="light" size="lg" radius="full"><QuestionIcon color="#212121" /></Button></div>
          <div><Button isIconOnly variant="light" size="lg" radius="full"><FriendsIcon color="#212121" /></Button></div>
        </div>
      </div>
    </div>
  );
};
