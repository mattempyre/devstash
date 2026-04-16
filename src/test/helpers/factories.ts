import { testPrisma } from "./db";

let counter = 0;
function uid() {
  return `test_${++counter}_${Date.now()}`;
}

export async function createTestUser(overrides: Record<string, unknown> = {}) {
  return testPrisma.user.create({
    data: {
      email: `test-${uid()}@devstash.test`,
      ...overrides,
    },
  });
}

export async function createTestItemType(
  userId: string | null,
  overrides: Record<string, unknown> = {}
) {
  return testPrisma.itemType.create({
    data: {
      name: `TestType-${uid()}`,
      icon: "Code",
      color: "#3b82f6",
      isSystem: userId === null,
      userId,
      ...overrides,
    },
  });
}

export async function createTestItem(
  userId: string,
  typeId: string,
  overrides: Record<string, unknown> = {}
) {
  return testPrisma.item.create({
    data: {
      title: `Test Item ${uid()}`,
      contentType: "text",
      content: "Test content",
      userId,
      typeId,
      ...overrides,
    },
  });
}

export async function createTestCollection(
  userId: string,
  overrides: Record<string, unknown> = {}
) {
  return testPrisma.collection.create({
    data: {
      name: `Test Collection ${uid()}`,
      userId,
      ...overrides,
    },
  });
}

export async function createTestTag(
  userId: string,
  overrides: Record<string, unknown> = {}
) {
  return testPrisma.tag.create({
    data: {
      name: `tag-${uid()}`,
      userId,
      ...overrides,
    },
  });
}

export function resetCounter() {
  counter = 0;
}
