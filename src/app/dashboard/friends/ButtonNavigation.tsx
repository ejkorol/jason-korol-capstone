"use client"

import {
  Button,
} from "@nextui-org/react";
import { useRouter, usePathname } from "next/navigation";

export default function ButtonNavigation() {

  const router = useRouter();
  const pathname = usePathname();
  const options = [
    {
      name: "Inbox",
      path: "/dashboard/friends"
    },
    {
      name: "Requests",
      path: "/dashboard/friends/requests"
    }
  ];

  return (
    <div className="flex w-full p-6 gap-6">
      {options.map(option => {
        return (
          <Button 
          onClick={() => router.push(option.path)}
          key={option.name}
          color={pathname === option.path ? "primary" : "default"}
          size="md"
          radius="md"
          variant="shadow"
          fullWidth>
          {option.name}
        </Button>
        )
      })}
    </div>
  );
};
