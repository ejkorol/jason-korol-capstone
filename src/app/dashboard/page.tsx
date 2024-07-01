import { Dream } from "@/types/dashboard";

import StatusBar from "@/app/dashboard/StatusBar";
import Search from "@/app/dashboard/Search";
import DreamFeed from "@/app/dashboard/DreamFeed";

async function fetchDreams(): Promise<Dream[]> {
  const API_URL = process.env.API_URL;
  const res = await fetch(`${API_URL}/users/dreams/1`, { cache: 'no-cache' });
  if (!res.ok) {
    throw new Error('Failed to fetch');
  };

  return res.json();
};

export default async function Dashboard() {
  const dreams = await fetchDreams();
  return (
    <section className="flex flex-col h-screen w-full">
      <StatusBar />
      <Search />
      <DreamFeed dreams={dreams} />
    </section>
  );
};
