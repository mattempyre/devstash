import Link from "next/link";
import { Star, MoreHorizontal, File } from "lucide-react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { collections, items, itemTypes } from "@/lib/mock-data";
import { iconMap } from "@/lib/icon-map";

function getCollectionTypeIcons(collectionId: string) {
  const collectionItems = items.filter((i) => i.collectionId === collectionId);
  const typeIds = [...new Set(collectionItems.map((i) => i.typeId))];
  return typeIds
    .map((typeId) => {
      const type = itemTypes.find((t) => t.id === typeId);
      return type ? { icon: type.icon, color: type.color, name: type.name } : null;
    })
    .filter(Boolean) as { icon: string; color: string; name: string }[];
}

function getDominantTypeColor(collectionId: string): string | undefined {
  const collectionItems = items.filter((i) => i.collectionId === collectionId);
  if (collectionItems.length === 0) return undefined;

  const counts: Record<string, number> = {};
  for (const item of collectionItems) {
    counts[item.typeId] = (counts[item.typeId] ?? 0) + 1;
  }
  const dominantTypeId = Object.entries(counts).sort((a, b) => b[1] - a[1])[0][0];
  return itemTypes.find((t) => t.id === dominantTypeId)?.color;
}

export function CollectionsGrid() {
  return (
    <section>
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold">Collections</h3>
        <Link
          href="/collections"
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {collections.map((col) => {
          const typeIcons = getCollectionTypeIcons(col.id);
          const borderColor = getDominantTypeColor(col.id);
          return (
            <Card
              key={col.id}
              size="sm"
              className="relative overflow-hidden transition-colors hover:ring-muted-foreground/25"
            >
              {borderColor && (
                <div
                  className="pointer-events-none absolute inset-0 rounded-xl"
                  style={{
                    background: `linear-gradient(to right, ${borderColor}18 0%, transparent 40%)`,
                    borderLeft: `2px solid ${borderColor}50`,
                  }}
                />
              )}
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {col.name}
                  {col.isFavorite && (
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  )}
                </CardTitle>
                <CardAction>
                  <Button variant="ghost" size="icon-xs" className="text-muted-foreground">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </CardAction>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {col.itemCount} items
                </p>
                <p className="mt-1 text-sm text-muted-foreground/70 line-clamp-1">
                  {col.description}
                </p>
                {typeIcons.length > 0 && (
                  <div className="mt-3 flex items-center gap-1.5">
                    {typeIcons.map((t) => {
                      const Icon = iconMap[t.icon] ?? File;
                      return (
                        <Icon
                          key={t.name}
                          className="h-3.5 w-3.5"
                          style={{ color: t.color }}
                        />
                      );
                    })}
                  </div>
                )}
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
