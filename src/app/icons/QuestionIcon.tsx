"use client";
import useColorSelect from "@/utils/hooks/useColorSelect";

export default function QuestionIcon() {

  const { color } = useColorSelect();

  return (
    <svg width="24px" height="24px" strokeWidth="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" stroke={color} color={color}><path d="M3.46875 18.3744L4.53321 16.0325M14.1134 18.3744L13.0489 16.0325M13.0489 16.0325L8.79105 6.66528L4.53321 16.0325M13.0489 16.0325H4.53321" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.1777 8.79421C15.1777 5.06857 21.0323 5.0686 21.0323 8.79421C21.0323 11.4554 18.3711 10.9231 18.3711 14.1164" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M18.3711 18.385L18.3817 18.3732" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg>
  );
};
