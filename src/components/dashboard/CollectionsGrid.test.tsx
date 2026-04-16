import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CollectionsGrid } from "./CollectionsGrid";
import type { CollectionWithStats } from "@/lib/db/collections";

const mockCollections: CollectionWithStats[] = [
  {
    id: "c1",
    name: "React Patterns",
    description: "Common React patterns and hooks",
    isFavorite: true,
    itemCount: 12,
    typeIcons: [{ name: "snippet", icon: "Code", color: "#3b82f6" }],
    dominantTypeColor: "#3b82f6",
  },
  {
    id: "c2",
    name: "Python Snippets",
    description: "Useful Python code snippets",
    isFavorite: false,
    itemCount: 8,
    typeIcons: [{ name: "snippet", icon: "Code", color: "#3b82f6" }],
    dominantTypeColor: "#3b82f6",
  },
  {
    id: "c3",
    name: "Context Files",
    description: "AI context files for projects",
    isFavorite: true,
    itemCount: 5,
    typeIcons: [{ name: "file", icon: "File", color: "#6b7280" }],
    dominantTypeColor: "#6b7280",
  },
  {
    id: "c4",
    name: "Interview Prep",
    description: "Technical interview prep",
    isFavorite: false,
    itemCount: 24,
    typeIcons: [{ name: "note", icon: "StickyNote", color: "#fde047" }],
    dominantTypeColor: "#fde047",
  },
  {
    id: "c5",
    name: "Git Commands",
    description: "Frequently used git commands",
    isFavorite: true,
    itemCount: 15,
    typeIcons: [{ name: "command", icon: "Terminal", color: "#f97316" }],
    dominantTypeColor: "#f97316",
  },
  {
    id: "c6",
    name: "AI Prompts",
    description: "Curated AI prompts",
    isFavorite: false,
    itemCount: 18,
    typeIcons: [{ name: "prompt", icon: "Sparkles", color: "#8b5cf6" }],
    dominantTypeColor: "#8b5cf6",
  },
];

describe("CollectionsGrid", () => {
  it("renders all provided collections", () => {
    render(<CollectionsGrid collections={mockCollections} />);

    expect(screen.getByText("React Patterns")).toBeInTheDocument();
    expect(screen.getByText("Python Snippets")).toBeInTheDocument();
    expect(screen.getByText("Context Files")).toBeInTheDocument();
    expect(screen.getByText("Interview Prep")).toBeInTheDocument();
    expect(screen.getByText("Git Commands")).toBeInTheDocument();
    expect(screen.getByText("AI Prompts")).toBeInTheDocument();
  });

  it("shows item counts for each collection", () => {
    render(<CollectionsGrid collections={mockCollections} />);

    expect(screen.getByText("12 items")).toBeInTheDocument();
    expect(screen.getByText("8 items")).toBeInTheDocument();
    expect(screen.getByText("5 items")).toBeInTheDocument();
    expect(screen.getByText("24 items")).toBeInTheDocument();
    expect(screen.getByText("15 items")).toBeInTheDocument();
    expect(screen.getByText("18 items")).toBeInTheDocument();
  });

  it("uses singular 'item' when count is 1", () => {
    render(
      <CollectionsGrid
        collections={[
          {
            id: "c1",
            name: "Solo",
            description: null,
            isFavorite: false,
            itemCount: 1,
            typeIcons: [],
            dominantTypeColor: null,
          },
        ]}
      />,
    );
    expect(screen.getByText("1 item")).toBeInTheDocument();
  });

  it("shows descriptions for collections", () => {
    render(<CollectionsGrid collections={mockCollections} />);

    expect(screen.getByText("Common React patterns and hooks")).toBeInTheDocument();
    expect(screen.getByText("Useful Python code snippets")).toBeInTheDocument();
  });

  it("renders section heading with View all link", () => {
    render(<CollectionsGrid collections={mockCollections} />);

    expect(screen.getByRole("heading", { name: "Collections" })).toBeInTheDocument();
    const viewAllLink = screen.getByRole("link", { name: "View all" });
    expect(viewAllLink).toHaveAttribute("href", "/collections");
  });

  it("shows empty state when no collections", () => {
    render(<CollectionsGrid collections={[]} />);
    expect(screen.getByText("No collections yet.")).toBeInTheDocument();
  });
});
