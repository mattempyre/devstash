import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import DashboardLayout from "./layout";

describe("DashboardLayout", () => {
  it("renders children within sidebar layout", () => {
    render(<DashboardLayout><p>dashboard content</p></DashboardLayout>);
    expect(screen.getByText("dashboard content")).toBeInTheDocument();
  });

  it("renders sidebar and topbar", () => {
    render(<DashboardLayout><p>test</p></DashboardLayout>);
    expect(screen.getByText("DevStash")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Search items...")).toBeInTheDocument();
  });
});
