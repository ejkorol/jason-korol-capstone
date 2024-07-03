"use client";
import { useState, useEffect } from "react";

interface StreamingTextProps {
  text: string;
  speed: number;
}

export default function StreamingText({ text, speed = 20 }: StreamingTextProps) {

  const [ displayedText, setDisplayedText ] = useState<string>("");
  const [ index, setIndex ] = useState<number>(0);

  useEffect(() => {
    if (index < text.length) {
      const intervalId = setInterval(() => {
        setDisplayedText((prev) => prev + text[index]);
        setIndex((prev) => prev + 1);
      }, speed);

      return () => clearInterval(intervalId);
    }
  }, [index, text, speed]);

  return <p className="text-sm">{displayedText}</p>
};
