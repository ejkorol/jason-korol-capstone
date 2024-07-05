import HomeIcon from "@/app/icons/HomeIcon";
import JournalIcon from "@/app/icons/JournalIcon";
import FriendsIcon from "@/app/icons/FriendsIcon";
import QuestionIcon from "@/app/icons/QuestionIcon";
import UserAvatar from "@/app/components/Dock/UserAvatar";
import {
  Button,
  Link,
} from "@nextui-org/react";

import { getSession } from "@/lib/auth";

export default async function Dock() {
  const { email, user } = await getSession();

  return (
    <div className="w-full fixed bottom-0 z-10">
      <div className="flex relative w-[90%] m-auto mb-4 h-[4rem] rounded-lg flex-col backdrop-blur-lg bg-neutral-200/90 z-10">
        <div className="pb-4 pt-4 pl-4 pr-4 flex justify-between items-center">
          <div className="flex w-[75%] justify-between">
            <div><Button className="flex items-center justify-center content-center" as={Link} href="/dashboard" isIconOnly variant="light" size="sm" radius="full"><HomeIcon color="#212121" /></Button></div>
            <div><Button className="flex items-center justify-center content-center" as={Link} href="/dashboard/symbols" isIconOnly variant="light" size="sm" radius="full"><JournalIcon color="#212121"/></Button></div>
            <div><Button className="flex items-center justify-center content-center" isIconOnly variant="light" size="sm" radius="full"><QuestionIcon color="#212121" /></Button></div>
            <div><Button className="flex items-center justify-center content-center" isIconOnly variant="light" size="sm" radius="full"><FriendsIcon color="#212121" /></Button></div>
          </div>
          <div><UserAvatar email={email as string} user={user as string} /></div>
        </div>
      </div>
    </div>
  );
};
