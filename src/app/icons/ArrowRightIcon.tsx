"use client";
import { IconProps } from "@/types/icons";
import useColorSelect from "@/utils/hooks/useColorSelect";

export default function ArrowRightIcon({ size, stroke }: IconProps) {

  const { color } = useColorSelect();

  return (
    <svg  height={size} viewBox="0 0 24 24" strokeWidth={stroke} fill="none" xmlns="http://www.w3.org/2000/svg" color="#000000"><path d="M3 12L21 12M21 12L12.5 3.5M21 12L12.5 20.5" stroke="#000000" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"></path></svg>
  );
};
