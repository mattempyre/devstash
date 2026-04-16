import { Layers, FolderOpen, Star, Heart } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { items, collections, itemTypeCounts } from "@/lib/mock-data";

const stats = [
  {
    label: "Total Items",
    value: Object.values(itemTypeCounts).reduce((a, b) => a + b, 0),
    icon: Layers,
    color: "text-blue-400",
    bg: "bg-blue-400/10",
  },
  {
    label: "Collections",
    value: collections.length,
    icon: FolderOpen,
    color: "text-purple-400",
    bg: "bg-purple-400/10",
  },
  {
    label: "Favorite Items",
    value: items.filter((i) => i.isFavorite).length,
    icon: Star,
    color: "text-yellow-400",
    bg: "bg-yellow-400/10",
  },
  {
    label: "Favorite Collections",
    value: collections.filter((c) => c.isFavorite).length,
    icon: Heart,
    color: "text-pink-400",
    bg: "bg-pink-400/10",
  },
];

export function StatsCards() {
  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {stats.map((stat) => (
        <Card key={stat.label} size="sm">
          <CardContent className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <p className="mt-1 text-2xl font-bold">{stat.value}</p>
            </div>
            <div className={`rounded-lg p-2 ${stat.bg}`}>
              <stat.icon className={`h-4 w-4 ${stat.color}`} />
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
