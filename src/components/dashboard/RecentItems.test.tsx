import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentItems } from "./RecentItems";
import type { RecentItem } from "@/lib/db/items";

const snippetType = { name: "snippet", icon: "Code", color: "#3b82f6" };
const promptType = { name: "prompt", icon: "Sparkles", color: "#8b5cf6" };
const commandType = { name: "command", icon: "Terminal", color: "#f97316" };
const noteType = { name: "note", icon: "StickyNote", color: "#fde047" };
const fileType = { name: "file", icon: "File", color: "#6b7280" };
const linkType = { name: "link", icon: "Link", color: "#10b981" };

const mockRecent: RecentItem[] = [
  { id: "i8", title: "Tailwind Breakpoints Reference", language: null, createdAt: new Date("2025-03-08"), type: linkType },
  { id: "i7", title: "Meeting Notes Template", language: "markdown", createdAt: new Date("2025-03-05"), type: noteType },
  { id: "i9", title: "System Design Interview Notes", language: "markdown", createdAt: new Date("2025-03-02"), type: noteType },
  { id: "i6", title: "Docker Compose Cheatsheet", language: "bash", createdAt: new Date("2025-03-01"), type: commandType },
  { id: "i4", title: "Code Review Prompt", language: null, createdAt: new Date("2025-02-20"), type: promptType },
  { id: "i5", title: "Python List Comprehension Patterns", language: "python", createdAt: new Date("2025-02-15"), type: snippetType },
  { id: "i3", title: "Git Rebase Workflow", language: "bash", createdAt: new Date("2025-02-10"), type: commandType },
  { id: "i10", title: "Project Context Template", language: null, createdAt: new Date("2025-01-22"), type: fileType },
  { id: "i1", title: "useAuth Hook", language: "typescript", createdAt: new Date("2025-01-15"), type: snippetType },
  { id: "i2", title: "API Error Handling Pattern", language: "typescript", createdAt: new Date("2025-01-12"), type: snippetType },
];

describe("RecentItems", () => {
  it("renders section heading", () => {
    render(<RecentItems items={mockRecent} />);

    expect(screen.getByRole("heading", { name: "Recent" })).toBeInTheDocument();
  });

  it("renders all 10 items", () => {
    render(<RecentItems items={mockRecent} />);

    expect(screen.getByText("Tailwind Breakpoints Reference")).toBeInTheDocument();
    expect(screen.getByText("Meeting Notes Template")).toBeInTheDocument();
    expect(screen.getByText("System Design Interview Notes")).toBeInTheDocument();
    expect(screen.getByText("Docker Compose Cheatsheet")).toBeInTheDocument();
    expect(screen.getByText("Code Review Prompt")).toBeInTheDocument();
    expect(screen.getByText("Python List Comprehension Patterns")).toBeInTheDocument();
    expect(screen.getByText("Git Rebase Workflow")).toBeInTheDocument();
    expect(screen.getByText("Project Context Template")).toBeInTheDocument();
    expect(screen.getByText("useAuth Hook")).toBeInTheDocument();
    expect(screen.getByText("API Error Handling Pattern")).toBeInTheDocument();
  });

  it("shows language badges where applicable", () => {
    render(<RecentItems items={mockRecent} />);

    expect(screen.getAllByText("typescript")).toHaveLength(2);
    expect(screen.getAllByText("bash")).toHaveLength(2);
    expect(screen.getByText("python")).toBeInTheDocument();
    expect(screen.getAllByText("markdown")).toHaveLength(2);
  });

  it("renders items in the order provided", () => {
    render(<RecentItems items={mockRecent} />);

    const items = screen.getAllByText(/^(Jan|Feb|Mar) \d+$/);
    const dates = items.map((el) => el.textContent);

    expect(dates[0]).toBe("Mar 8");
    expect(dates[dates.length - 1]).toBe("Jan 12");
  });

  it("renders nothing when there are no recent items", () => {
    const { container } = render(<RecentItems items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });
});
