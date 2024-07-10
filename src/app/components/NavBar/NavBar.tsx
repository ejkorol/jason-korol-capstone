"use client";
import MoonLogo from "@/app/icons/MoonLogo";
import NotificationIcon from "@/app/icons/NotificationIcon";
import {
  Navbar,
  NavbarContent,
  NavbarItem,
  Button
} from "@nextui-org/react";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function NavBar() {

  const [ mounted, setMounted ] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  function switchTheme() {
    if (theme === "dark") {
      setTheme("light")
    } else {
      setTheme("dark");
    };
  };

  if (!mounted) return null;

  return (
    <Navbar position="static" maxWidth="full" isBlurred className="mt-4">
      <NavbarContent justify="end">
        <NavbarItem><Button isIconOnly variant="light" radius="full" size="md"><NotificationIcon size={30} stroke={1.5}/></Button></NavbarItem>
        <NavbarItem><Button onClick={switchTheme} isIconOnly variant="light" radius="full"><MoonLogo size={30}/></Button></NavbarItem>
      </NavbarContent>
    </Navbar>
  );
};
