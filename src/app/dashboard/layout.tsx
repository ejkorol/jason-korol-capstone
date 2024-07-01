import Dock from "@/app/components/Dock/Dock";
import NavBar from "@/app/components/NavBar/NavBar";

export const metadata = {
  title: "Lucid Dashboard",
  description: "Dashboard"
}

export default function DashboardLayout({
  children,
}: { children: React.ReactNode }) {
  return (
    <>
      <NavBar />
      {children}
      <Dock />
    </>
  )
}
