import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardPage from "./page";

vi.mock("@/lib/db/collections", () => ({
  getDemoUserId: vi.fn().mockResolvedValue("user_1"),
  getCollectionsWithStats: vi.fn().mockResolvedValue([
    {
      id: "c1",
      name: "React Patterns",
      description: "Common React patterns",
      isFavorite: true,
      itemCount: 3,
      typeIcons: [{ name: "snippet", icon: "Code", color: "#3b82f6" }],
      dominantTypeColor: "#3b82f6",
    },
  ]),
}));

vi.mock("@/lib/db/items", () => ({
  getPinnedItems: vi.fn().mockResolvedValue([
    {
      id: "i1",
      title: "useAuth Hook",
      description: "Custom authentication hook",
      isFavorite: true,
      createdAt: new Date("2025-01-15"),
      tags: ["react"],
      type: { name: "snippet", icon: "Code", color: "#3b82f6" },
    },
  ]),
  getRecentItems: vi.fn().mockResolvedValue([
    {
      id: "i1",
      title: "useAuth Hook",
      language: "typescript",
      createdAt: new Date("2025-01-15"),
      type: { name: "snippet", icon: "Code", color: "#3b82f6" },
    },
  ]),
  getDashboardStats: vi.fn().mockResolvedValue({
    totalItems: 10,
    collectionsCount: 1,
    favoriteItems: 1,
    favoriteCollections: 1,
  }),
}));

describe("DashboardPage", () => {
  it("renders dashboard heading", async () => {
    const Page = await DashboardPage();
    render(Page);
    expect(screen.getByRole("heading", { name: "Dashboard" })).toBeInTheDocument();
  });

  it("renders all dashboard sections", async () => {
    const Page = await DashboardPage();
    render(Page);
    expect(screen.getByText("Total Items")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Collections" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Pinned" })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Recent" })).toBeInTheDocument();
  });

  it("renders fetched collections", async () => {
    const Page = await DashboardPage();
    render(Page);
    expect(screen.getByText("React Patterns")).toBeInTheDocument();
    expect(screen.getByText("3 items")).toBeInTheDocument();
  });
});
