"use client";
import links from "./links";
import { Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function DockButtons() {

  const router = useRouter();
  const { theme } = useTheme();
  const pathname = usePathname();
  const [ defaultColor, setDefaultColor ] = useState("#212121");
  const [ selectedColor, setSelectedColor ] = useState("#fafafa");

  useEffect(() => {
    if (theme === "dark") {
      setDefaultColor("#A3A3A3");
      setSelectedColor("#212121");
    } else if (theme === "light") {
      setDefaultColor("#BDBDBD");
      setSelectedColor("#fafafa");
    };
  }, [theme])

  return (
    <div className="flex w-[75%] justify-between">
      {links.map((link) => (
        <div key={link.link}>
          <Button
            onClick={() => router.push(link.link)}
            color="secondary"
            className="flex items-center justify-center content-center"
            isIconOnly
            variant={pathname === link.link ? "shadow" : "light"}
            size="lg"
          >
            <link.icon color={pathname === link.link ? selectedColor : defaultColor} />
          </Button>
        </div>
      ))}
    </div>
  );
}
