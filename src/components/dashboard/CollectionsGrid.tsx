import Link from "next/link";
import { Star, MoreHorizontal, File } from "lucide-react";
import { Card, CardHeader, CardTitle, CardAction, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { iconMap } from "@/lib/icon-map";
import type { CollectionWithStats } from "@/lib/db/collections";

export function CollectionsGrid({ collections }: { collections: CollectionWithStats[] }) {
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
      {collections.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No collections yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {collections.map((col) => {
            const borderColor = col.dominantTypeColor;
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
                    {col.itemCount} {col.itemCount === 1 ? "item" : "items"}
                  </p>
                  {col.description && (
                    <p className="mt-1 text-sm text-muted-foreground/70 line-clamp-1">
                      {col.description}
                    </p>
                  )}
                  {col.typeIcons.length > 0 && (
                    <div className="mt-3 flex items-center gap-1.5">
                      {col.typeIcons.map((t) => {
                        const Icon = (t.icon && iconMap[t.icon]) || File;
                        return (
                          <Icon
                            key={t.name}
                            className="h-3.5 w-3.5"
                            style={t.color ? { color: t.color } : undefined}
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
      )}
    </section>
  );
}
