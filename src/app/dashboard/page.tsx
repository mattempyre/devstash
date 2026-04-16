import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";
import {
  getCollectionsWithStats,
  getDemoUserId,
} from "@/lib/db/collections";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await getDemoUserId();
  const collections = userId ? await getCollectionsWithStats(userId) : [];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your developer knowledge hub
        </p>
      </div>
      <StatsCards />
      <CollectionsGrid collections={collections} />
      <PinnedItems />
      <RecentItems />
    </div>
  );
}
