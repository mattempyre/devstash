import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_POOL_URL ?? process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

async function main() {
  console.log("Testing database connection...\n");

  // Test connection
  const result = await prisma.$queryRawUnsafe<{ now: Date }[]>("SELECT NOW()");
  console.log(`✓ Connected at ${result[0].now}\n`);

  // List tables
  const tables = await prisma.$queryRawUnsafe<{ tablename: string }[]>(
    "SELECT tablename::text FROM pg_tables WHERE schemaname = 'public' ORDER BY tablename"
  );
  console.log(`Tables (${tables.length}):`);
  for (const t of tables) {
    console.log(`  - ${t.tablename}`);
  }

  // Count system item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(`\nSystem item types (${itemTypes.length}):`);
  for (const type of itemTypes) {
    console.log(`  - ${type.name} (${type.icon}, ${type.color})`);
  }

  // Count records per table
  const [users, items, collections, tags] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);
  console.log(`\nRecord counts:`);
  console.log(`  Users: ${users}`);
  console.log(`  Items: ${items}`);
  console.log(`  Collections: ${collections}`);
  console.log(`  Tags: ${tags}`);

  console.log("\n✓ All tests passed.");
}

main()
  .catch((e) => {
    console.error("✗ Database test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
