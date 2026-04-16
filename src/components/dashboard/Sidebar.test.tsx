import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/helpers/render";
import { AppSidebar } from "./Sidebar";
import type { SystemItemTypeWithCount } from "@/lib/db/items";
import type { CollectionWithStats, DemoUser } from "@/lib/db/collections";

const itemTypes: SystemItemTypeWithCount[] = [
  { id: "t1", name: "snippet", icon: "Code", color: "#3b82f6", count: 24 },
  { id: "t2", name: "prompt", icon: "Sparkles", color: "#8b5cf6", count: 18 },
  { id: "t3", name: "command", icon: "Terminal", color: "#f97316", count: 15 },
  { id: "t4", name: "note", icon: "StickyNote", color: "#fde047", count: 12 },
  { id: "t5", name: "file", icon: "File", color: "#6b7280", count: 5 },
  { id: "t6", name: "image", icon: "Image", color: "#ec4899", count: 3 },
  { id: "t7", name: "link", icon: "Link", color: "#10b981", count: 8 },
];

const favoriteCollections: CollectionWithStats[] = [
  {
    id: "c1",
    name: "React Patterns",
    description: null,
    isFavorite: true,
    itemCount: 3,
    typeIcons: [],
    dominantTypeColor: "#3b82f6",
  },
  {
    id: "c2",
    name: "Context Files",
    description: null,
    isFavorite: true,
    itemCount: 5,
    typeIcons: [],
    dominantTypeColor: "#6b7280",
  },
];

const recentCollections: CollectionWithStats[] = [
  {
    id: "c3",
    name: "Python Snippets",
    description: null,
    isFavorite: false,
    itemCount: 8,
    typeIcons: [],
    dominantTypeColor: "#3b82f6",
  },
  {
    id: "c4",
    name: "Interview Prep",
    description: null,
    isFavorite: false,
    itemCount: 24,
    typeIcons: [],
    dominantTypeColor: null,
  },
];

const user: DemoUser = {
  id: "user_1",
  name: "Demo User",
  email: "demo@devstash.io",
};

function renderSidebar(overrides: Partial<Parameters<typeof AppSidebar>[0]> = {}) {
  return render(
    <AppSidebar
      itemTypes={itemTypes}
      favoriteCollections={favoriteCollections}
      recentCollections={recentCollections}
      user={user}
      {...overrides}
    />,
  );
}

describe("AppSidebar", () => {
  it("renders all 7 item types", () => {
    renderSidebar();

    expect(screen.getByText("Snippets")).toBeInTheDocument();
    expect(screen.getByText("Prompts")).toBeInTheDocument();
    expect(screen.getByText("Commands")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Files")).toBeInTheDocument();
    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Links")).toBeInTheDocument();
  });

  it("shows item type counts as badges", () => {
    renderSidebar();

    expect(screen.getByText("Types")).toBeInTheDocument();
    expect(screen.getAllByText("24").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("18").length).toBeGreaterThanOrEqual(1);
  });

  it("renders favorite and recent collection sections", () => {
    renderSidebar();

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("Recents")).toBeInTheDocument();
    expect(screen.getByText("React Patterns")).toBeInTheDocument();
    expect(screen.getByText("Context Files")).toBeInTheDocument();
    expect(screen.getByText("Python Snippets")).toBeInTheDocument();
    expect(screen.getByText("Interview Prep")).toBeInTheDocument();
  });

  it("renders the View all collections link", () => {
    renderSidebar();

    const link = screen.getByRole("link", { name: /View all collections/ });
    expect(link).toHaveAttribute("href", "/collections");
  });

  it("renders collection item counts as badges", () => {
    renderSidebar();

    // Favorites: 3 (React Patterns), 5 (Context Files)
    expect(screen.getAllByText("3").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("5").length).toBeGreaterThanOrEqual(1);
    // Recents: 8 (Python Snippets), 24 (Interview Prep)
    expect(screen.getAllByText("8").length).toBeGreaterThanOrEqual(1);
    expect(screen.getAllByText("24").length).toBeGreaterThanOrEqual(1);
  });

  it("renders user footer with name and email", () => {
    renderSidebar();

    expect(screen.getByText("Demo User")).toBeInTheDocument();
    expect(screen.getByText("demo@devstash.io")).toBeInTheDocument();
  });

  it("renders item type links with correct hrefs", () => {
    renderSidebar();

    const snippetsLinks = screen.getAllByRole("link", { name: /Snippets/ });
    const typeLink = snippetsLinks.find(
      (el) => el.getAttribute("href") === "/items/snippet",
    );
    expect(typeLink).toBeDefined();
  });

  it("hides the favorites section when there are no favorites", () => {
    renderSidebar({ favoriteCollections: [] });
    expect(screen.queryByText("Favorites")).not.toBeInTheDocument();
  });

  it("hides the recents section when there are no recents", () => {
    renderSidebar({ recentCollections: [] });
    expect(screen.queryByText("Recents")).not.toBeInTheDocument();
  });

  it("omits the footer when user is null", () => {
    renderSidebar({ user: null });
    expect(screen.queryByText("Demo User")).not.toBeInTheDocument();
  });
});
