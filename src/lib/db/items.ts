import { prisma } from "@/lib/prisma";

export type ItemTypeInfo = {
  name: string;
  icon: string | null;
  color: string | null;
};

export type PinnedItem = {
  id: string;
  title: string;
  description: string | null;
  isFavorite: boolean;
  createdAt: Date;
  tags: string[];
  type: ItemTypeInfo;
};

export type RecentItem = {
  id: string;
  title: string;
  language: string | null;
  createdAt: Date;
  type: ItemTypeInfo;
};

export type DashboardStats = {
  totalItems: number;
  collectionsCount: number;
  favoriteItems: number;
  favoriteCollections: number;
};

/**
 * Fetch the user's pinned items, newest first, with item-type metadata
 * and flattened tag names for rendering.
 */
export async function getPinnedItems(userId: string): Promise<PinnedItem[]> {
  const items = await prisma.item.findMany({
    where: { userId, isPinned: true },
    include: {
      type: true,
      tags: { include: { tag: true } },
    },
    orderBy: { createdAt: "desc" },
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    description: item.description,
    isFavorite: item.isFavorite,
    createdAt: item.createdAt,
    tags: item.tags.map((t) => t.tag.name),
    type: {
      name: item.type.name,
      icon: item.type.icon,
      color: item.type.color,
    },
  }));
}

/**
 * Fetch the user's most recent items, newest first, with the type and
 * language needed by the compact recent-items list.
 */
export async function getRecentItems(
  userId: string,
  limit = 10,
): Promise<RecentItem[]> {
  const items = await prisma.item.findMany({
    where: { userId },
    include: { type: true },
    orderBy: { createdAt: "desc" },
    take: limit,
  });

  return items.map((item) => ({
    id: item.id,
    title: item.title,
    language: item.language,
    createdAt: item.createdAt,
    type: {
      name: item.type.name,
      icon: item.type.icon,
      color: item.type.color,
    },
  }));
}

/**
 * Aggregate counts shown in the dashboard stat cards.
 */
export async function getDashboardStats(
  userId: string,
): Promise<DashboardStats> {
  const [totalItems, collectionsCount, favoriteItems, favoriteCollections] =
    await Promise.all([
      prisma.item.count({ where: { userId } }),
      prisma.collection.count({ where: { userId } }),
      prisma.item.count({ where: { userId, isFavorite: true } }),
      prisma.collection.count({ where: { userId, isFavorite: true } }),
    ]);

  return {
    totalItems,
    collectionsCount,
    favoriteItems,
    favoriteCollections,
  };
}
