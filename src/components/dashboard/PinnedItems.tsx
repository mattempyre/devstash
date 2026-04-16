import { Pin, Star, File } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { items, itemTypes } from "@/lib/mock-data";
import { iconMap } from "@/lib/icon-map";

const pinnedItems = items.filter((i) => i.isPinned);

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function PinnedItems() {
  if (pinnedItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Pin className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Pinned</h3>
      </div>
      <div className="space-y-3">
        {pinnedItems.map((item) => {
          const type = itemTypes.find((t) => t.id === item.typeId);
          const Icon = type ? (iconMap[type.icon] ?? File) : File;
          const color = type?.color ?? "#888";

          return (
            <Card key={item.id} size="sm" className="transition-colors hover:ring-muted-foreground/25">
              <CardContent className="flex items-center gap-4">
                <div
                  className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${color}15` }}
                >
                  <Icon className="h-5 w-5" style={{ color }} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium truncate">{item.title}</span>
                    <Pin className="h-3 w-3 shrink-0 text-muted-foreground" />
                    {item.isFavorite && (
                      <Star className="h-3 w-3 shrink-0 fill-yellow-500 text-yellow-500" />
                    )}
                  </div>
                  <p className="mt-0.5 text-sm text-muted-foreground/70 truncate">
                    {item.description}
                  </p>
                  {item.tags.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {item.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  )}
                </div>
                <span className="shrink-0 text-sm text-muted-foreground">
                  {formatDate(item.createdAt)}
                </span>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </section>
  );
}
