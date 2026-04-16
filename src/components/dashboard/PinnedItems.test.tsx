import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PinnedItems } from "./PinnedItems";

describe("PinnedItems", () => {
  it("renders section heading", () => {
    render(<PinnedItems />);

    expect(screen.getByRole("heading", { name: "Pinned" })).toBeInTheDocument();
  });

  it("renders both pinned items", () => {
    render(<PinnedItems />);

    expect(screen.getByText("useAuth Hook")).toBeInTheDocument();
    expect(screen.getByText("API Error Handling Pattern")).toBeInTheDocument();
  });

  it("shows item descriptions", () => {
    render(<PinnedItems />);

    expect(
      screen.getByText("Custom authentication hook for React applications")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Fetch wrapper with exponential backoff retry logic")
    ).toBeInTheDocument();
  });

  it("renders tags for pinned items", () => {
    render(<PinnedItems />);

    // item_1 tags: react, auth, hooks
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("auth")).toBeInTheDocument();
    expect(screen.getByText("hooks")).toBeInTheDocument();

    // item_2 tags: api, error-handling, fetch
    expect(screen.getByText("api")).toBeInTheDocument();
    expect(screen.getByText("error-handling")).toBeInTheDocument();
    expect(screen.getByText("fetch")).toBeInTheDocument();
  });

  it("shows formatted dates", () => {
    render(<PinnedItems />);

    // item_1: Jan 15, item_2: Jan 12
    expect(screen.getByText("Jan 15")).toBeInTheDocument();
    expect(screen.getByText("Jan 12")).toBeInTheDocument();
  });
});
