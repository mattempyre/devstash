import { prisma } from "@/lib/prisma";

export type CollectionTypeIcon = {
  name: string;
  icon: string | null;
  color: string | null;
};

export type CollectionWithStats = {
  id: string;
  name: string;
  description: string | null;
  isFavorite: boolean;
  itemCount: number;
  typeIcons: CollectionTypeIcon[];
  dominantTypeColor: string | null;
};

/**
 * Fetch a user's collections along with item count, the set of item types
 * represented in the collection (for the small icon row), and the color of
 * the most-used type (for the card accent).
 *
 * Results are ordered by most recently updated.
 */
export async function getCollectionsWithStats(
  userId: string,
  limit = 6,
): Promise<CollectionWithStats[]> {
  const collections = await prisma.collection.findMany({
    where: { userId },
    include: {
      items: {
        include: {
          item: {
            include: { type: true },
          },
        },
      },
    },
    orderBy: { updatedAt: "desc" },
    take: limit,
  });

  return collections.map((col) => {
    const types = col.items.map((link) => link.item.type);

    // Unique types for the icon row, preserving first-seen order.
    const seen = new Set<string>();
    const typeIcons: CollectionTypeIcon[] = [];
    for (const t of types) {
      if (seen.has(t.id)) continue;
      seen.add(t.id);
      typeIcons.push({ name: t.name, icon: t.icon, color: t.color });
    }

    // Dominant type = most frequent type in the collection.
    const counts = new Map<string, { count: number; color: string | null }>();
    for (const t of types) {
      const existing = counts.get(t.id);
      if (existing) {
        existing.count += 1;
      } else {
        counts.set(t.id, { count: 1, color: t.color });
      }
    }
    let dominantTypeColor: string | null = null;
    let max = 0;
    for (const { count, color } of counts.values()) {
      if (count > max) {
        max = count;
        dominantTypeColor = color;
      }
    }

    return {
      id: col.id,
      name: col.name,
      description: col.description,
      isFavorite: col.isFavorite,
      itemCount: col.items.length,
      typeIcons,
      dominantTypeColor,
    };
  });
}

/**
 * Looks up the demo user used before auth is wired up. Returns null if
 * the seed hasn't been run.
 */
export async function getDemoUserId(): Promise<string | null> {
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
    select: { id: true },
  });
  return user?.id ?? null;
}
