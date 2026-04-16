import { test, expect } from "@playwright/test";

test.describe("Dashboard", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/dashboard");
  });

  test("loads and displays stat cards", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByText("Total Items")).toBeVisible();
    await expect(main.getByText("Favorite Items")).toBeVisible();
    await expect(main.getByText("Favorite Collections")).toBeVisible();
  });

  test("displays sidebar with item types", async ({ page }) => {
    const sidebar = page.locator("[data-slot='sidebar']");
    await expect(sidebar.getByText("Snippets", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("Prompts", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("Commands", { exact: true })).toBeVisible();
    await expect(sidebar.getByText("Notes", { exact: true })).toBeVisible();
  });

  test("displays pinned items section", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { name: "Pinned" })).toBeVisible();
    // "useAuth Hook" appears in both Pinned and Recent — use first() for the pinned one
    await expect(main.getByText("useAuth Hook").first()).toBeVisible();
    await expect(main.getByText("API Error Handling Pattern").first()).toBeVisible();
  });

  test("sidebar collapses on toggle", async ({ page }) => {
    const sidebar = page.locator("[data-slot='sidebar']");
    await expect(sidebar).toHaveAttribute("data-state", "expanded");

    // Click the sidebar trigger button to collapse
    await page.getByRole("button", { name: "Toggle Sidebar" }).click();

    await expect(sidebar).toHaveAttribute("data-state", "collapsed");
  });

  test("displays recent items section", async ({ page }) => {
    const main = page.getByRole("main");
    await expect(main.getByRole("heading", { name: "Recent" })).toBeVisible();
  });
});
