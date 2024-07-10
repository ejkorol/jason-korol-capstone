"use client";

export default function StatusBar({children}: any) {
  return (
    <div className="flex w-full p-6">
      <h1 className="text-4xl tracking-wide">{children}</h1>
    </div>
  );
};
