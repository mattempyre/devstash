import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { StatsCards } from "./StatsCards";

function getStatValue(label: string) {
  const labelEl = screen.getByText(label);
  const wrapper = labelEl.parentElement!;
  return within(wrapper).getByText(/^\d+$/).textContent;
}

describe("StatsCards", () => {
  it("renders all 4 stat cards", () => {
    render(<StatsCards />);

    expect(screen.getByText("Total Items")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("Favorite Items")).toBeInTheDocument();
    expect(screen.getByText("Favorite Collections")).toBeInTheDocument();
  });

  it("computes Total Items as sum of itemTypeCounts (85)", () => {
    render(<StatsCards />);

    // itemTypeCounts: 24 + 18 + 15 + 12 + 5 + 3 + 8 = 85
    expect(getStatValue("Total Items")).toBe("85");
  });

  it("shows correct Collections count (6)", () => {
    render(<StatsCards />);

    expect(getStatValue("Collections")).toBe("6");
  });

  it("shows correct Favorite Items count (2)", () => {
    render(<StatsCards />);

    // items with isFavorite: true → item_1 (useAuth Hook), item_4 (Code Review Prompt)
    expect(getStatValue("Favorite Items")).toBe("2");
  });

  it("shows correct Favorite Collections count (3)", () => {
    render(<StatsCards />);

    // collections with isFavorite: true → React Patterns, Context Files, Git Commands
    expect(getStatValue("Favorite Collections")).toBe("3");
  });
});
