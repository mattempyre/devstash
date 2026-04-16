"use client";

import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="grid h-14 grid-cols-[auto_1fr_auto] items-center border-b border-border px-6">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md bg-primary text-primary-foreground text-sm font-bold">
          D
        </div>
        <span className="text-sm font-semibold">DevStash</span>
      </div>

      <div className="flex justify-center px-8">
        <div className="relative w-full max-w-md">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="h-8 w-full pl-8 text-sm"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-[10px] text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm">
          <Plus className="mr-1 h-4 w-4" />
          New Item
        </Button>
      </div>
    </header>
  );
}
