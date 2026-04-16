import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PinnedItems } from "./PinnedItems";
import type { PinnedItem } from "@/lib/db/items";

const mockPinned: PinnedItem[] = [
  {
    id: "i1",
    title: "useAuth Hook",
    description: "Custom authentication hook for React applications",
    isFavorite: true,
    createdAt: new Date("2025-01-15"),
    tags: ["react", "auth", "hooks"],
    type: { name: "snippet", icon: "Code", color: "#3b82f6" },
  },
  {
    id: "i2",
    title: "API Error Handling Pattern",
    description: "Fetch wrapper with exponential backoff retry logic",
    isFavorite: false,
    createdAt: new Date("2025-01-12"),
    tags: ["api", "error-handling", "fetch"],
    type: { name: "snippet", icon: "Code", color: "#3b82f6" },
  },
];

describe("PinnedItems", () => {
  it("renders section heading", () => {
    render(<PinnedItems items={mockPinned} />);

    expect(screen.getByRole("heading", { name: "Pinned" })).toBeInTheDocument();
  });

  it("renders both pinned items", () => {
    render(<PinnedItems items={mockPinned} />);

    expect(screen.getByText("useAuth Hook")).toBeInTheDocument();
    expect(screen.getByText("API Error Handling Pattern")).toBeInTheDocument();
  });

  it("shows item descriptions", () => {
    render(<PinnedItems items={mockPinned} />);

    expect(
      screen.getByText("Custom authentication hook for React applications")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fetch wrapper with exponential backoff retry logic")
    ).toBeInTheDocument();
  });

  it("renders tags for pinned items", () => {
    render(<PinnedItems items={mockPinned} />);

    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("auth")).toBeInTheDocument();
    expect(screen.getByText("hooks")).toBeInTheDocument();

    expect(screen.getByText("api")).toBeInTheDocument();
    expect(screen.getByText("error-handling")).toBeInTheDocument();
    expect(screen.getByText("fetch")).toBeInTheDocument();
  });

  it("shows formatted dates", () => {
    render(<PinnedItems items={mockPinned} />);

    expect(screen.getByText("Jan 15")).toBeInTheDocument();
    expect(screen.getByText("Jan 12")).toBeInTheDocument();
  });

  it("renders nothing when there are no pinned items", () => {
    const { container } = render(<PinnedItems items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
