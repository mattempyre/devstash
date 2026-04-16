"use client";

import { Search, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function TopBar() {
  return (
    <header className="grid h-16 grid-cols-[auto_1fr_auto] items-center border-b border-border px-4">
      <div className="flex items-center gap-2 pr-4">
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-base font-bold">
          D
        </div>
        <span className="text-base font-semibold">DevStash</span>
      </div>

      <div className="flex justify-center px-4 md:px-8">
        <div className="relative w-full max-w-lg">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search items..."
            className="h-10 w-full pl-9 text-base"
          />
          <kbd className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 rounded border border-border bg-muted px-1.5 py-0.5 text-xs text-muted-foreground">
            ⌘K
          </kbd>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="outline" size="default">
          <Plus className="mr-1.5 h-4 w-4" />
          <span className="hidden sm:inline">New Item</span>
        </Button>
      </div>
    </header>
  );
}
