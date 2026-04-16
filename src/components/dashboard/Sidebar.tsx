"use client";

import Link from "next/link";
import { useState } from "react";
import {
  ChevronDown,
  Folder,
  File,
  Settings,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { iconMap } from "@/lib/icon-map";
import type { SystemItemTypeWithCount } from "@/lib/db/items";
import type { CollectionWithStats, DemoUser } from "@/lib/db/collections";

type AppSidebarProps = {
  itemTypes: SystemItemTypeWithCount[];
  favoriteCollections: CollectionWithStats[];
  recentCollections: CollectionWithStats[];
  user: DemoUser | null;
};

function displayTypeName(name: string) {
  return name.charAt(0).toUpperCase() + name.slice(1) + "s";
}

function CollectionDot({ color }: { color: string | null }) {
  return (
    <span
      aria-hidden="true"
      className="h-2.5 w-2.5 shrink-0 rounded-full bg-muted-foreground/40"
      style={color ? { backgroundColor: color } : undefined}
    />
  );
}

/**
 * Grid-rows trick animates from 0 to auto smoothly.
 * When `open` flips, grid-template-rows transitions between 0fr and 1fr,
 * and the inner overflow-hidden wrapper clips the content during the tween.
 */
function CollapsibleRegion({
  open,
  id,
  children,
}: {
  open: boolean;
  id: string;
  children: React.ReactNode;
}) {
  return (
    <div
      id={id}
      aria-hidden={!open}
      className="grid transition-[grid-template-rows] duration-200 ease-out"
      style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
    >
      <div className="overflow-hidden">{children}</div>
    </div>
  );
}

export function AppSidebar({
  itemTypes,
  favoriteCollections,
  recentCollections,
  user,
}: AppSidebarProps) {
  const [typesOpen, setTypesOpen] = useState(true);
  const [collectionsOpen, setCollectionsOpen] = useState(true);

  return (
    <Sidebar collapsible="icon">
      {/* Header: "Navigation" label + collapse trigger */}
      <SidebarHeader>
        <div className="flex items-center justify-between group-data-[collapsible=icon]:justify-center">
          <span className="text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/50 group-data-[collapsible=icon]:hidden">
            Navigation
          </span>
          <SidebarTrigger />
        </div>
      </SidebarHeader>

      <SidebarContent>
        {/* Types */}
        <SidebarGroup>
          <SidebarGroupLabel
            render={
              <button
                type="button"
                onClick={() => setTypesOpen((v) => !v)}
                aria-expanded={typesOpen}
                aria-controls="sidebar-types"
                className="w-full cursor-pointer"
              />
            }
          >
            <ChevronDown
              className={`mr-1 h-4 w-4 transition-transform duration-200 ${
                typesOpen ? "" : "-rotate-90"
              }`}
            />
            Types
          </SidebarGroupLabel>
          <CollapsibleRegion open={typesOpen} id="sidebar-types">
            <SidebarGroupContent>
              <SidebarMenu>
                {itemTypes.map((type) => {
                  const Icon = type.icon ? iconMap[type.icon] ?? File : File;
                  const label = displayTypeName(type.name);
                  return (
                    <SidebarMenuItem key={type.id}>
                      <SidebarMenuButton
                        render={<Link href={`/items/${type.name}`} />}
                        tooltip={label}
                      >
                        <Icon style={type.color ? { color: type.color } : undefined} />
                        <span>{label}</span>
                      </SidebarMenuButton>
                      <SidebarMenuBadge>{type.count}</SidebarMenuBadge>
                    </SidebarMenuItem>
                  );
                })}
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleRegion>
        </SidebarGroup>

        {/* Collections — hidden when sidebar itself collapses to icons */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel
            render={
              <button
                type="button"
                onClick={() => setCollectionsOpen((v) => !v)}
                aria-expanded={collectionsOpen}
                aria-controls="sidebar-collections"
                className="w-full cursor-pointer"
              />
            }
          >
            <ChevronDown
              className={`mr-1 h-4 w-4 transition-transform duration-200 ${
                collectionsOpen ? "" : "-rotate-90"
              }`}
            />
            Collections
          </SidebarGroupLabel>
          <CollapsibleRegion open={collectionsOpen} id="sidebar-collections">
            <SidebarGroupContent>
              {favoriteCollections.length > 0 && (
                <>
                  <div className="px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                    Favorites
                  </div>
                  <SidebarMenu>
                    {favoriteCollections.map((col) => (
                      <SidebarMenuItem key={col.id}>
                        <SidebarMenuButton
                          render={<Link href={`/collections/${col.id}`} />}
                          tooltip={col.name}
                        >
                          <CollectionDot color={col.dominantTypeColor} />
                          <span>{col.name}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>{col.itemCount}</SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </>
              )}

              {recentCollections.length > 0 && (
                <>
                  <div className="mt-3 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
                    Recents
                  </div>
                  <SidebarMenu>
                    {recentCollections.map((col) => (
                      <SidebarMenuItem key={col.id}>
                        <SidebarMenuButton
                          render={<Link href={`/collections/${col.id}`} />}
                          tooltip={col.name}
                        >
                          <CollectionDot color={col.dominantTypeColor} />
                          <span>{col.name}</span>
                        </SidebarMenuButton>
                        <SidebarMenuBadge>{col.itemCount}</SidebarMenuBadge>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </>
              )}

              <SidebarMenu className="mt-2">
                <SidebarMenuItem>
                  <SidebarMenuButton
                    render={<Link href="/collections" />}
                    tooltip="View all collections"
                    className="text-sidebar-foreground/70"
                  >
                    <Folder />
                    <span>View all collections</span>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarGroupContent>
          </CollapsibleRegion>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      {user && (
        <SidebarFooter>
          <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton tooltip={user.name}>
                <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                  {user.name.charAt(0)}
                </div>
                <span className="flex-1 min-w-0">
                  <span className="block truncate text-sm font-medium">{user.name}</span>
                  <span className="block truncate text-xs text-sidebar-foreground/60">
                    {user.email}
                  </span>
                </span>
                <Settings className="text-sidebar-foreground/60" />
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
        </SidebarFooter>
      )}
    </Sidebar>
  );
}
