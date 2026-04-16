import { StatsCards } from "@/components/dashboard/StatsCards";
import { CollectionsGrid } from "@/components/dashboard/CollectionsGrid";
import { PinnedItems } from "@/components/dashboard/PinnedItems";
import { RecentItems } from "@/components/dashboard/RecentItems";
import {
  getCollectionsWithStats,
  getDemoUserId,
} from "@/lib/db/collections";
import {
  getDashboardStats,
  getPinnedItems,
  getRecentItems,
} from "@/lib/db/items";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const userId = await getDemoUserId();

  const [collections, pinnedItems, recentItems, stats] = userId
    ? await Promise.all([
        getCollectionsWithStats(userId),
        getPinnedItems(userId),
        getRecentItems(userId),
        getDashboardStats(userId),
      ])
    : [
        [],
        [],
        [],
        {
          totalItems: 0,
          collectionsCount: 0,
          favoriteItems: 0,
          favoriteCollections: 0,
        },
      ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="mt-1 text-muted-foreground">
          Your developer knowledge hub
        </p>
      </div>
      <StatsCards stats={stats} />
      <CollectionsGrid collections={collections} />
      <PinnedItems items={pinnedItems} />
      <RecentItems items={recentItems} />
    </div>
  );
}
