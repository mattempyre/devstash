import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/dashboard/Sidebar";
import { TopBar } from "@/components/dashboard/TopBar";
import { getSystemItemTypesWithCounts } from "@/lib/db/items";
import {
  getDemoUser,
  getSidebarCollections,
} from "@/lib/db/collections";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getDemoUser();

  const [itemTypes, sidebarCollections] = user
    ? await Promise.all([
        getSystemItemTypesWithCounts(user.id),
        getSidebarCollections(user.id),
      ])
    : [[], { favorites: [], recents: [] }];

  return (
    <SidebarProvider>
      <div className="flex h-screen flex-col flex-1">
        <TopBar />
        <div className="flex flex-1 overflow-hidden">
          <AppSidebar
            itemTypes={itemTypes}
            favoriteCollections={sidebarCollections.favorites}
            recentCollections={sidebarCollections.recents}
            user={user}
          />
          <main className="flex-1 overflow-y-auto p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  );
}
