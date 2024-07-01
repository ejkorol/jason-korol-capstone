import MoonLogo from "@/app/icons/MoonLogo";
import NotificationIcon from "@/app/icons/NotificationIcon";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button
} from "@nextui-org/react";

export default function NavBar() {
  return (
    <Navbar position="static" maxWidth="full" isBlurred className="mt-4">
      <NavbarContent justify="end">
        <NavbarItem><Button isIconOnly variant="light" radius="full" size="md"><NotificationIcon color="#bdbdbd" size="30px" stroke="1.5px"/></Button></NavbarItem>
        <NavbarItem><Button isIconOnly variant="light" radius="full"><MoonLogo size="30px" color="#bdbdbd"/></Button></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
