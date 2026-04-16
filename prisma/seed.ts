import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_POOL_URL ?? process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

const systemItemTypes = [
  { name: "Snippets", icon: "Code", color: "#3b82f6" },
  { name: "Prompts", icon: "Sparkles", color: "#a855f7" },
  { name: "Commands", icon: "Terminal", color: "#22c55e" },
  { name: "Notes", icon: "FileText", color: "#eab308" },
  { name: "Files", icon: "File", color: "#94a3b8" },
  { name: "Images", icon: "Image", color: "#ec4899" },
  { name: "Links", icon: "Link", color: "#f97316" },
];

async function main() {
  console.log("Seeding system item types...");

  for (const type of systemItemTypes) {
    const existing = await prisma.itemType.findFirst({
      where: { name: type.name, isSystem: true },
    });

    if (existing) {
      await prisma.itemType.update({
        where: { id: existing.id },
        data: { icon: type.icon, color: type.color },
      });
      console.log(`  ✓ ${type.name} (updated)`);
    } else {
      await prisma.itemType.create({
        data: {
          name: type.name,
          icon: type.icon,
          color: type.color,
          isSystem: true,
        },
      });
      console.log(`  ✓ ${type.name} (created)`);
    }
  }

  console.log("\nSeed complete.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
