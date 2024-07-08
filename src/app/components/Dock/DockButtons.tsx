"use client";
import links from "./links";
import {
  Button,
  Link,
} from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";

export default function DockButtons() {

  const { theme } = useTheme();
  const pathname = usePathname();
  const [ defaultColor, setDefaultColor ] = useState("#212121");
  const [ selectedColor, setSelectedColor ] = useState("#fafafa");

  useEffect(() => {
    if (theme === "dark") {
      setDefaultColor("#fafafa");
      setSelectedColor("#212121");
    } else if (theme === "light") {
      setDefaultColor("#212121");
      setSelectedColor("#fafafa");
    };
  }, [theme]);

  return (
    <div className="flex w-[75%] justify-between pb-4 pt-4 pl-4 pr-4">
      {links.map(link => {
        return <div key={link.link}>
          <Button
            color="secondary"
            className="flex items-center justify-center content-center"
            as={Link}
            href={link.link}
            isIconOnly
            variant={pathname === link.link ? "shadow" : "light"}
            size="sm">
            {
              <link.icon color={pathname === link.link ? selectedColor : defaultColor} />
            }
          </Button>
        </div>
      })}
    </div>
  );
};
