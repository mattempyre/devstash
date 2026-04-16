import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardLayout from "./layout";

vi.mock("@/lib/db/collections", () => ({
  getDemoUser: vi.fn().mockResolvedValue({
    id: "user_1",
    name: "Demo User",
    email: "demo@devstash.io",
  }),
  getSidebarCollections: vi.fn().mockResolvedValue({
    favorites: [],
    recents: [],
  }),
}));

vi.mock("@/lib/db/items", () => ({
  getSystemItemTypesWithCounts: vi.fn().mockResolvedValue([]),
}));

describe("DashboardLayout", () => {
  it("renders children within sidebar layout", async () => {
    const Layout = await DashboardLayout({ children: <p>dashboard content</p> });
    render(Layout);
    expect(screen.getByText("dashboard content")).toBeInTheDocument();
  });

  it("renders sidebar and topbar", async () => {
    const Layout = await DashboardLayout({ children: <p>test</p> });
    render(Layout);
    expect(screen.getByText("DevStash")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });
});
