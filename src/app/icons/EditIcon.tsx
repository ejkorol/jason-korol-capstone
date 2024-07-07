"use client";
import { IconProps } from "@/types/icons";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

export default function EditIcon({ size, stroke }: IconProps) {

  const [color, setColor] = useState("#FAFAFA");
  const { theme } = useTheme();

  useEffect(() => {
    if (theme === "dark") {
      setColor("#212121");
    } else if (theme === "light") {
      setColor("#fafafa");
    };
  }, [theme]);


  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round" className="feather feather-edit-2"><path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path></svg>
  );
};
