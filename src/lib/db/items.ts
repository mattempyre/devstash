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

export type SystemItemTypeWithCount = {
  id: string;
  name: string;
  icon: string | null;
  color: string | null;
  count: number;
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

/**
 * Fetch all system item types along with the number of items the user has
 * of each type. Used to power the sidebar type list.
 *
 * Types are returned in a stable order matching the seed ordering (snippet,
 * prompt, command, note, file, image, link) when possible, falling back to
 * alphabetical for any unknown types.
 */
const SYSTEM_TYPE_ORDER = [
  "snippet",
  "prompt",
  "command",
  "note",
  "file",
  "image",
  "link",
];

export async function getSystemItemTypesWithCounts(
  userId: string,
): Promise<SystemItemTypeWithCount[]> {
  const [types, counts] = await Promise.all([
    prisma.itemType.findMany({ where: { isSystem: true } }),
    prisma.item.groupBy({
      by: ["typeId"],
      where: { userId },
      _count: { _all: true },
    }),
  ]);

  const countMap = new Map<string, number>();
  for (const row of counts) {
    countMap.set(row.typeId, row._count._all);
  }

  const indexFor = (name: string) => {
    const i = SYSTEM_TYPE_ORDER.indexOf(name);
    return i === -1 ? SYSTEM_TYPE_ORDER.length : i;
  };

  return types
    .map((t) => ({
      id: t.id,
      name: t.name,
      icon: t.icon,
      color: t.color,
      count: countMap.get(t.id) ?? 0,
    }))
    .sort((a, b) => {
      const ia = indexFor(a.name);
      const ib = indexFor(b.name);
      if (ia !== ib) return ia - ib;
      return a.name.localeCompare(b.name);
    });
}
