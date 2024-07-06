import { Dream } from "@/types/dashboard";
import { getSession, getUser } from "@/lib/auth";

import StatusBar from "@/app/dashboard/StatusBar";
import Search from "@/app/dashboard/Search";
import DreamFeed from "@/app/dashboard/DreamFeed";

const { signal } = new AbortController()

async function fetchDreams(): Promise<Dream[]> {
  try {
    const session = await getSession(); 
    const res = await fetch(`${process.env.API_URL}/users/${session.userId}/dreams`, { signal });
    if (!res.ok) {
      throw new Error('Failed to fetch');
    };
    return res.json();
  } catch (err: any) {
    throw new Error(err);
  };
};

export default async function Dashboard() {
  const dreams = await fetchDreams();
  const user = await getUser();
  return (
    <section className="flex flex-col h-full w-full fixed">
      <StatusBar user={user as string} />
      <Search/>
      <DreamFeed dreams={dreams} />
    </section>
  );
};
