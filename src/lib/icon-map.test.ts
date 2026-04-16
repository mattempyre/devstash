import { describe, it, expect } from "vitest";
import { iconMap } from "./icon-map";
import { itemTypes } from "./mock-data";

describe("iconMap", () => {
  it("has entries for all 7 system icon keys", () => {
    const expectedKeys = [
      "Code",
      "Sparkles",
      "Terminal",
      "FileText",
      "File",
      "Image",
      "Link",
    ];
    for (const key of expectedKeys) {
      expect(iconMap[key]).toBeDefined();
    }
  });

  it("every system item type icon resolves to a component", () => {
    for (const type of itemTypes) {
      const Icon = iconMap[type.icon];
      expect(Icon, `Missing icon for "${type.name}" (icon: "${type.icon}")`).toBeDefined();
      expect(typeof Icon).toBe("object"); // Lucide icons are forwardRef objects
    }
  });

  it("returns undefined for unknown icon keys", () => {
    expect(iconMap["NonExistent"]).toBeUndefined();
  });

  it("all values are valid React components (have render property)", () => {
    for (const [key, component] of Object.entries(iconMap)) {
      expect(
        component,
        `iconMap["${key}"] should be a component`
      ).toBeDefined();
      // Lucide icons are forwardRef components — they have $$typeof
      expect(component).toHaveProperty("$$typeof");
    }
  });
});
