"use client";

import Link from "next/link";
import {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link as LinkIcon,
  ChevronDown,
  Star,
  Folder,
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
import { itemTypes, itemTypeCounts, collections, currentUser } from "@/lib/mock-data";

const iconMap: Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>> = {
  Code,
  Sparkles,
  Terminal,
  FileText,
  File,
  Image,
  Link: LinkIcon,
};

export function AppSidebar() {
  const favoriteCollections = collections.filter((c) => c.isFavorite);
  const allCollections = collections;

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
          <SidebarGroupLabel>
            <ChevronDown className="mr-1 h-4 w-4" />
            Types
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {itemTypes.map((type) => {
                const Icon = iconMap[type.icon] ?? File;
                const count = itemTypeCounts[type.id] ?? 0;
                const slug = type.name.toLowerCase();
                return (
                  <SidebarMenuItem key={type.id}>
                    <SidebarMenuButton
                      render={<Link href={`/items/${slug}`} />}
                      tooltip={type.name}
                    >
                      <Icon style={{ color: type.color }} />
                      <span>{type.name}</span>
                    </SidebarMenuButton>
                    <SidebarMenuBadge>{count}</SidebarMenuBadge>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        {/* Collections — hidden when collapsed */}
        <SidebarGroup className="group-data-[collapsible=icon]:hidden">
          <SidebarGroupLabel>
            <ChevronDown className="mr-1 h-4 w-4" />
            Collections
          </SidebarGroupLabel>
          <SidebarGroupContent>
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
                    <Folder />
                    <span>{col.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>
                    <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" />
                  </SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>

            <div className="mt-3 px-2 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/40">
              All Collections
            </div>
            <SidebarMenu>
              {allCollections.map((col) => (
                <SidebarMenuItem key={col.id}>
                  <SidebarMenuButton
                    render={<Link href={`/collections/${col.id}`} />}
                    tooltip={col.name}
                  >
                    <Folder />
                    <span>{col.name}</span>
                  </SidebarMenuButton>
                  <SidebarMenuBadge>{col.itemCount}</SidebarMenuBadge>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      {/* User Footer */}
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton tooltip={currentUser.name}>
              <div className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {currentUser.name.charAt(0)}
              </div>
              <span className="flex-1 min-w-0">
                <span className="block truncate text-sm font-medium">{currentUser.name}</span>
                <span className="block truncate text-xs text-sidebar-foreground/60">
                  {currentUser.email}
                </span>
              </span>
              <Settings className="text-sidebar-foreground/60" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
