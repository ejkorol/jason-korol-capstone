import StatusBar from "@/app/dashboard/StatusBar";
import Search from "@/app/dashboard/Search";
import DreamFeed from "@/app/dashboard/Feed";

export default async function Dashboard() {
  return (
    <section className="flex flex-col h-screen w-full">
      <StatusBar />
      <Search />
      <DreamFeed />
    </section>
  );
};
