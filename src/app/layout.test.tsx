import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";

vi.mock("next/font/google", () => ({
  Roboto: () => ({ variable: "--font-roboto" }),
  Roboto_Mono: () => ({ variable: "--font-roboto-mono" }),
}));

import RootLayout from "./layout";

describe("RootLayout", () => {
  it("renders children inside body", () => {
    render(<RootLayout><p>child content</p></RootLayout>);
    expect(screen.getByText("child content")).toBeInTheDocument();
  });
});
