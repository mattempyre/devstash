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

  // Demo user
  const user = await prisma.user.findUnique({
    where: { email: "demo@devstash.io" },
  });
  console.log(`\nDemo user:`);
  if (user) {
    console.log(`  Name: ${user.name}`);
    console.log(`  Email: ${user.email}`);
    console.log(`  isPro: ${user.isPro}`);
    console.log(`  emailVerified: ${user.emailVerified}`);
    console.log(`  hasPassword: ${!!user.password}`);
  } else {
    console.log("  ✗ Not found — run `npx prisma db seed` first");
  }

  // System item types
  const itemTypes = await prisma.itemType.findMany({
    where: { isSystem: true },
    orderBy: { name: "asc" },
  });
  console.log(`\nSystem item types (${itemTypes.length}):`);
  for (const type of itemTypes) {
    console.log(`  - ${type.name} (${type.icon}, ${type.color})`);
  }

  // Collections with item counts
  const collections = await prisma.collection.findMany({
    where: { userId: user?.id },
    include: {
      items: {
        include: {
          item: {
            include: { type: true },
          },
        },
      },
    },
    orderBy: { name: "asc" },
  });
  console.log(`\nCollections (${collections.length}):`);
  for (const col of collections) {
    console.log(`\n  📁 ${col.name} — ${col.description}`);
    for (const ic of col.items) {
      const item = ic.item;
      const preview = item.content
        ? item.content.substring(0, 60).replace(/\n/g, " ") + "..."
        : item.url ?? "(no content)";
      console.log(`    - [${item.type.name}] ${item.title}`);
      console.log(`      ${preview}`);
    }
  }

  // Record counts
  const [userCount, itemCount, collectionCount, tagCount] = await Promise.all([
    prisma.user.count(),
    prisma.item.count(),
    prisma.collection.count(),
    prisma.tag.count(),
  ]);
  console.log(`\nRecord counts:`);
  console.log(`  Users: ${userCount}`);
  console.log(`  Items: ${itemCount}`);
  console.log(`  Collections: ${collectionCount}`);
  console.log(`  Tags: ${tagCount}`);

  console.log("\n✓ All tests passed.");
}

main()
  .catch((e) => {
    console.error("✗ Database test failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
