import { Pin, Star, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/icon-map";
import type { PinnedItem } from "@/lib/db/items";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function PinnedItems({ items }: { items: PinnedItem[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Pinned</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => {
          const Icon = (item.type.icon && iconMap[item.type.icon]) || File;
          const color = item.type.color ?? "#888";

          return (
            <Card
              key={item.id}
              size="sm"
              className="transition-colors hover:ring-muted-foreground/25"
            >
              <CardContent className="flex h-full flex-col gap-3">
                <div className="flex items-start gap-3">
                  <div
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                    style={{ backgroundColor: `${color}15` }}
                  >
                    <Icon className="h-5 w-5" style={{ color }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="truncate font-medium">{item.title}</span>
                      <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />
                      {item.isFavorite && (
                        <Star className="h-3 w-3 shrink-0 fill-yellow-500 text-yellow-500" />
                      )}
                    </div>
                    <span className="text-xs text-muted-foreground">
                      {formatDate(item.createdAt)}
                    </span>
                  </div>
                </div>
                {item.description && (
                  <p className="text-sm text-muted-foreground/70 line-clamp-2">
                    {item.description}
                  </p>
                )}
                {item.tags.length > 0 && (
                  <div className="mt-auto flex flex-wrap gap-1.5">
                    {item.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
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
