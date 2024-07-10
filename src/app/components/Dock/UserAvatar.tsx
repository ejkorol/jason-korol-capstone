"use client";
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownSection,
  Avatar,
  DropdownItem
} from "@nextui-org/react";
import { removeSession } from "@/lib/auth";

interface UserAvatarProps {
  email: string;
  user: string;
};

export default function UserAvatar({email, user}: UserAvatarProps) {
  return (
    <Dropdown placement="top-start" backdrop="blur">
      <DropdownTrigger>
        <Avatar size="sm" color="primary" isBordered as="button" />
      </DropdownTrigger>
      <DropdownMenu variant="flat">
        <DropdownSection title="Signed in as:" showDivider>
          <DropdownItem key="profile" className="h-14 gap-2" textValue="profile" description={email}>
            <p className="font-semibold capitalize">{user}</p>
          </DropdownItem>
        </DropdownSection>
        <DropdownSection title="Actions">
          <DropdownItem key="logout" textValue="Logout" className="text-danger" description="Signout of your account" onClick={() => removeSession()}>
            Logout
          </DropdownItem>
        </DropdownSection>
      </DropdownMenu>
    </Dropdown>
  );
};
