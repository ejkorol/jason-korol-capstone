import HomeIcon from "@/app/icons/HomeIcon";
import JournalIcon from "@/app/icons/JournalIcon";
import QuestionIcon from "@/app/icons/QuestionIcon";
import FriendsIcon from "@/app/icons/FriendsIcon";
import { Button, Link } from "@nextui-org/react";

export default async function Dock() {

  return (
    <div className="w-full fixed bottom-0">
      <div className="flex relative flex-col bg-gray-100/70 backdrop-blur-md">
        <div className="pb-4 pt-4 pl-4 pr-4 flex justify-between items-center">
          <div><Button as={Link} href="/dashboard" isIconOnly variant="light" size="lg" radius="full"><HomeIcon color="#212121" /></Button></div>
          <div><Button isIconOnly variant="light" size="lg" radius="full"><JournalIcon color="#212121"/></Button></div>
          <div><Button isIconOnly variant="light" size="lg" radius="full"><QuestionIcon color="#212121" /></Button></div>
          <div><Button isIconOnly variant="light" size="lg" radius="full"><FriendsIcon color="#212121" /></Button></div>
        </div>
      </div>
    </div>
  );
};
