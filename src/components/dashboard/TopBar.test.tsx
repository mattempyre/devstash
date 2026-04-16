import { describe, it, expect } from "vitest";
import { render, screen } from "@/test/helpers/render";
import { TopBar } from "./TopBar";

describe("TopBar", () => {
  it("renders DevStash branding", () => {
    render(<TopBar />);

    expect(screen.getByText("DevStash")).toBeInTheDocument();
    expect(screen.getByText("D")).toBeInTheDocument();
  });

  it("renders search input with placeholder", () => {
    render(<TopBar />);

    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });

  it("shows keyboard shortcut hint", () => {
    render(<TopBar />);

    expect(screen.getByText("⌘K")).toBeInTheDocument();
  });

  it("renders New Item button", () => {
    render(<TopBar />);

    expect(screen.getByText("New Item")).toBeInTheDocument();
  });
});
