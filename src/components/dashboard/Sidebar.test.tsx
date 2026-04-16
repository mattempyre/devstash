import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/helpers/render";
import { AppSidebar } from "./Sidebar";

describe("AppSidebar", () => {
  it("renders all 7 item types", () => {
    render(<AppSidebar />);

    expect(screen.getByText("Snippets")).toBeInTheDocument();
    expect(screen.getByText("Prompts")).toBeInTheDocument();
    expect(screen.getByText("Commands")).toBeInTheDocument();
    expect(screen.getByText("Notes")).toBeInTheDocument();
    expect(screen.getByText("Files")).toBeInTheDocument();
    expect(screen.getByText("Images")).toBeInTheDocument();
    expect(screen.getByText("Links")).toBeInTheDocument();
  });

  it("shows item type counts as badges", () => {
    render(<AppSidebar />);

    // Verify the Types group label exists, then check counts within the sidebar
    expect(screen.getByText("Types")).toBeInTheDocument();
    // Spot-check a few counts exist (exact uniqueness varies with collection counts)
    expect(screen.getAllByText("24").length).toBeGreaterThanOrEqual(1); // Snippets
    expect(screen.getAllByText("18").length).toBeGreaterThanOrEqual(1); // Prompts
  });

  it("renders favorite and all collections sections", () => {
    render(<AppSidebar />);

    expect(screen.getByText("Favorites")).toBeInTheDocument();
    expect(screen.getByText("All Collections")).toBeInTheDocument();
    // Favorites appear in both sections — 2 of each
    expect(screen.getAllByText("React Patterns")).toHaveLength(2);
    expect(screen.getAllByText("Context Files")).toHaveLength(2);
    expect(screen.getAllByText("Git Commands")).toHaveLength(2);
    // Non-favorites only appear in All Collections
    expect(screen.getByText("Python Snippets")).toBeInTheDocument();
    expect(screen.getByText("Interview Prep")).toBeInTheDocument();
    expect(screen.getByText("AI Prompts")).toBeInTheDocument();
  });

  it("renders user footer with name and email", () => {
    render(<AppSidebar />);

    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("demo@devstash.io")).toBeInTheDocument();
  });

  it("renders item type links with correct hrefs", () => {
    render(<AppSidebar />);

    const snippetsLinks = screen.getAllByRole("link", { name: /Snippets/ });
    const typeLink = snippetsLinks.find((el) => el.getAttribute("href") === "/items/snippets");
    expect(typeLink).toBeDefined();
  });
});
