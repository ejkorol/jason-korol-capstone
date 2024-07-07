"use client";
import { IconProps } from "@/types/icons";
import useColorSelect from "@/utils/hooks/useColorSelect";

export default function NotificationIcon({ size  }:IconProps) {

  const { color } = useColorSelect();

  return (
    <svg xmlns="http://www.w3.org/2000/svg" height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5px" strokeLinecap="round" strokeLinejoin="round" className="feather feather-bell"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
  );
};
