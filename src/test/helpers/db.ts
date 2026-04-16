import { PrismaClient } from "@/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString:
    process.env.TEST_DATABASE_POOL_URL ?? process.env.TEST_DATABASE_URL!,
});

export const testPrisma = new PrismaClient({ adapter });

/**
 * Deletes all rows in dependency order.
 * Call in beforeEach to ensure a clean slate.
 */
export async function cleanDatabase() {
  await testPrisma.itemTag.deleteMany();
  await testPrisma.itemCollection.deleteMany();
  await testPrisma.item.deleteMany();
  await testPrisma.tag.deleteMany();
  await testPrisma.collection.deleteMany();
  await testPrisma.itemType.deleteMany();
  await testPrisma.session.deleteMany();
  await testPrisma.account.deleteMany();
  await testPrisma.verificationToken.deleteMany();
  await testPrisma.user.deleteMany();
}
