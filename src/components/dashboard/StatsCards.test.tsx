import { describe, it, expect } from "vitest";
import { render, screen, within } from "@testing-library/react";
import { StatsCards } from "./StatsCards";

const mockStats = {
  totalItems: 85,
  collectionsCount: 6,
  favoriteItems: 2,
  favoriteCollections: 3,
};

function getStatValue(label: string) {
  const labelEl = screen.getByText(label);
  const wrapper = labelEl.parentElement!;
  return within(wrapper).getByText(/^\d+$/).textContent;
}

describe("StatsCards", () => {
  it("renders all 4 stat cards", () => {
    render(<StatsCards stats={mockStats} />);

    expect(screen.getByText("Total Items")).toBeInTheDocument();
    expect(screen.getByText("Collections")).toBeInTheDocument();
    expect(screen.getByText("Favorite Items")).toBeInTheDocument();
    expect(screen.getByText("Favorite Collections")).toBeInTheDocument();
  });

  it("renders Total Items value", () => {
    render(<StatsCards stats={mockStats} />);
    expect(getStatValue("Total Items")).toBe("85");
  });

  it("renders Collections value", () => {
    render(<StatsCards stats={mockStats} />);
    expect(getStatValue("Collections")).toBe("6");
  });

  it("renders Favorite Items value", () => {
    render(<StatsCards stats={mockStats} />);
    expect(getStatValue("Favorite Items")).toBe("2");
  });

  it("renders Favorite Collections value", () => {
    render(<StatsCards stats={mockStats} />);
    expect(getStatValue("Favorite Collections")).toBe("3");
  });
});
