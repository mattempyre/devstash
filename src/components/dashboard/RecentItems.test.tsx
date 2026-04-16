import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { RecentItems } from "./RecentItems";

describe("RecentItems", () => {
  it("renders section heading", () => {
    render(<RecentItems />);

    expect(screen.getByRole("heading", { name: "Recent" })).toBeInTheDocument();
  });

  it("renders all 10 items", () => {
    render(<RecentItems />);

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
    render(<RecentItems />);

    // "typescript" appears for 2 items (useAuth Hook + API Error Handling)
    expect(screen.getAllByText("typescript")).toHaveLength(2);
    // "bash" appears for 2 items (Git Rebase + Docker Compose)
    expect(screen.getAllByText("bash")).toHaveLength(2);
    expect(screen.getByText("python")).toBeInTheDocument();
    // "markdown" appears for 2 items (Meeting Notes + System Design)
    expect(screen.getAllByText("markdown")).toHaveLength(2);
  });

  it("items are sorted by date descending (most recent first)", () => {
    render(<RecentItems />);

    const items = screen.getAllByText(/^(Jan|Feb|Mar) \d+$/);
    const dates = items.map((el) => el.textContent);

    // First item should be Mar 8 (most recent), last should be Jan 12
    expect(dates[0]).toBe("Mar 8");
    expect(dates[dates.length - 1]).toBe("Jan 12");
  });
});
