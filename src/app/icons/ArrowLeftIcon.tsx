import { IconProps } from "@/types/icons";

export default function ArrowLeftIcon({ size, stroke, color }: IconProps) {
  return (
    <svg height={size} viewBox="0 0 24 24" strokeWidth={stroke} fill={color} xmlns="http://www.w3.org/2000/svg" color={color}><path d="M21 12L3 12M3 12L11.5 3.5M3 12L11.5 20.5" stroke={color} strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round"></path></svg>
  );
};
