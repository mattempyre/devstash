import { Clock, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { iconMap } from "@/lib/icon-map";
import type { RecentItem } from "@/lib/db/items";

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentItems({ items }: { items: RecentItem[] }) {
  if (items.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Recent</h3>
      </div>
      <div className="space-y-1">
        {items.map((item) => {
          const Icon = (item.type.icon && iconMap[item.type.icon]) || File;
          const color = item.type.color ?? "#888";

          return (
            <div
              key={item.id}
              className="flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors hover:bg-muted/50"
            >
              <Icon className="h-4 w-4 shrink-0" style={{ color }} />
              <span className="min-w-0 flex-1 truncate text-sm font-medium">
                {item.title}
              </span>
              {item.language && (
                <Badge variant="secondary">{item.language}</Badge>
              )}
              <span className="shrink-0 text-xs text-muted-foreground">
                {formatDate(item.createdAt)}
              </span>
            </div>
          );
        })}
      </div>
    </section>
  );
}
