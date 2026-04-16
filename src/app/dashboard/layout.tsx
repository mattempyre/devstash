import { TopBar } from "@/components/dashboard/TopBar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <TopBar />
      <div className="flex flex-1 overflow-hidden">
        <aside className="w-60 border-r border-border p-6">
          <h2 className="text-lg font-semibold">Sidebar</h2>
        </aside>
        <main className="flex-1 overflow-y-auto p-6">{children}</main>
      </div>
    </div>
  );
}
