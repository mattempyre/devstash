import { Clock, File } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { items, itemTypes } from "@/lib/mock-data";
import { iconMap } from "@/lib/icon-map";

const recentItems = [...items]
  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
  .slice(0, 10);

function formatDate(date: Date) {
  return date.toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

export function RecentItems() {
  if (recentItems.length === 0) return null;

  return (
    <section>
      <div className="mb-4 flex items-center gap-2">
        <Clock className="h-4 w-4 text-muted-foreground" />
        <h3 className="text-lg font-semibold">Recent</h3>
      </div>
      <div className="space-y-1">
        {recentItems.map((item) => {
          const type = itemTypes.find((t) => t.id === item.typeId);
          const Icon = type ? (iconMap[type.icon] ?? File) : File;
          const color = type?.color ?? "#888";

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
