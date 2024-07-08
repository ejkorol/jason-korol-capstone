import UserAvatar from "@/app/components/Dock/UserAvatar";
import DockButtons from "./DockButtons";

import { getSession } from "@/lib/auth";

export default async function Dock() {
  const { email, user } = await getSession();

  return (
    <div className="w-full fixed bottom-0 z-10">
      <div className="flex relative w-[90%] m-auto mb-4 h-[4rem] rounded-lg flex-col backdrop-blur-lg bg-default z-10">
        <div className="flex justify-between items-center ml-4 mr-4">
          <DockButtons />
          <div className="pb-4 pt-4 pl-4 pr-4">
            <UserAvatar email={email as string} user={user as string} />
          </div>
        </div>
      </div>
    </div>
  );
};
