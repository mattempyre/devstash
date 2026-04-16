import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/generated/prisma/client", () => ({
  PrismaClient: class MockPrismaClient {
    _isMock = true;
    constructor() {}
  },
}));

vi.mock("@prisma/adapter-neon", () => ({
  PrismaNeon: vi.fn(),
}));

vi.mock("@neondatabase/serverless", () => ({
  neonConfig: {},
}));

vi.mock("ws", () => ({ default: class MockWs {} }));

describe("prisma singleton", () => {
  beforeEach(() => {
    vi.resetModules();
  });

  it("exports a prisma client instance", async () => {
    const { prisma } = await import("./prisma");
    expect(prisma).toBeDefined();
    expect((prisma as unknown as { _isMock: boolean })._isMock).toBe(true);
  });

  it("caches the client on globalThis in non-production", async () => {
    const { prisma } = await import("./prisma");
    const global = globalThis as unknown as { prisma: unknown };
    expect(global.prisma).toBe(prisma);
  });
});
