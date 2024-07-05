'use client';
import useGreeting from "@/utils/hooks/useGreeting";
import { Skeleton } from "@nextui-org/react";

interface StatusBarProps {
  user: string;
};

export default function StatusBar({user}: StatusBarProps) {

  const { time, greeting, loading } = useGreeting();

  if (loading) {
    return (
      <div className="flex w-full p-6">
        <div className="flex flex-col">
          <Skeleton className="w-100 rounded-lg">
            <h1 className="text-4xl tracking-wide">placeholder time</h1>
          </Skeleton>
          <Skeleton className="w-100 rounded-lg mt-4">
            <h2 className="text-2xl tracking-wide font-light text-neutral-500">user</h2>
          </Skeleton>
        </div>
      </div>
    );
  };

  return (
    <div className="flex w-full p-6">
      <div className="flex flex-col">
        <h1 className="text-4xl tracking-wide">{ time }</h1>
        <h2 className="text-2xl tracking-wide font-light text-neutral-500 mt-4 capitalize">{ greeting }, {user}</h2>
      </div>
    </div>
  );
};
