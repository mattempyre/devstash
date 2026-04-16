import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { CollectionsGrid } from "./CollectionsGrid";

describe("CollectionsGrid", () => {
  it("renders all 6 collections", () => {
    render(<CollectionsGrid />);

    expect(screen.getByText("React Patterns")).toBeInTheDocument();
    expect(screen.getByText("Python Snippets")).toBeInTheDocument();
    expect(screen.getByText("Context Files")).toBeInTheDocument();
    expect(screen.getByText("Interview Prep")).toBeInTheDocument();
    expect(screen.getByText("Git Commands")).toBeInTheDocument();
    expect(screen.getByText("AI Prompts")).toBeInTheDocument();
  });

  it("shows item counts for each collection", () => {
    render(<CollectionsGrid />);

    expect(screen.getByText("12 items")).toBeInTheDocument();
    expect(screen.getByText("8 items")).toBeInTheDocument();
    expect(screen.getByText("5 items")).toBeInTheDocument();
    expect(screen.getByText("24 items")).toBeInTheDocument();
    expect(screen.getByText("15 items")).toBeInTheDocument();
    expect(screen.getByText("18 items")).toBeInTheDocument();
  });

  it("shows descriptions for collections", () => {
    render(<CollectionsGrid />);

    expect(screen.getByText("Common React patterns and hooks")).toBeInTheDocument();
    expect(screen.getByText("Useful Python code snippets")).toBeInTheDocument();
  });

  it("renders section heading with View all link", () => {
    render(<CollectionsGrid />);

    expect(screen.getByRole("heading", { name: "Collections" })).toBeInTheDocument();
    const viewAllLink = screen.getByRole("link", { name: "View all" });
    expect(viewAllLink).toHaveAttribute("href", "/collections");
  });
});
