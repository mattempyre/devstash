import { PrismaClient } from "../src/generated/prisma/client";
import { PrismaNeon } from "@prisma/adapter-neon";
import { neonConfig } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import ws from "ws";

neonConfig.webSocketConstructor = ws;

const adapter = new PrismaNeon({
  connectionString: process.env.DATABASE_POOL_URL ?? process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({ adapter });

// ─── System Item Types ──────────────────────────────────────────────

const systemItemTypes = [
  { name: "snippet", icon: "Code", color: "#3b82f6" },
  { name: "prompt", icon: "Sparkles", color: "#8b5cf6" },
  { name: "command", icon: "Terminal", color: "#f97316" },
  { name: "note", icon: "StickyNote", color: "#fde047" },
  { name: "file", icon: "File", color: "#6b7280" },
  { name: "image", icon: "Image", color: "#ec4899" },
  { name: "link", icon: "Link", color: "#10b981" },
] as const;

// ─── Seed Items by Collection ───────────────────────────────────────

const collections = [
  {
    name: "React Patterns",
    description: "Reusable React patterns and hooks",
    items: [
      {
        title: "useDebounce Hook",
        type: "snippet",
        language: "typescript",
        isPinned: true,
        isFavorite: true,
        content: `import { useEffect, useState } from "react";

export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}

// Usage:
// const debouncedSearch = useDebounce(searchTerm, 300);`,
      },
      {
        title: "Compound Component Pattern",
        type: "snippet",
        language: "typescript",
        content: `import { createContext, useContext, useState, ReactNode } from "react";

interface AccordionContextType {
  openIndex: number | null;
  toggle: (index: number) => void;
}

const AccordionContext = createContext<AccordionContextType | null>(null);

function useAccordion() {
  const ctx = useContext(AccordionContext);
  if (!ctx) throw new Error("useAccordion must be used within Accordion");
  return ctx;
}

export function Accordion({ children }: { children: ReactNode }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggle = (index: number) =>
    setOpenIndex((prev) => (prev === index ? null : index));

  return (
    <AccordionContext.Provider value={{ openIndex, toggle }}>
      <div className="divide-y">{children}</div>
    </AccordionContext.Provider>
  );
}

export function AccordionItem({
  index,
  title,
  children,
}: {
  index: number;
  title: string;
  children: ReactNode;
}) {
  const { openIndex, toggle } = useAccordion();
  return (
    <div>
      <button onClick={() => toggle(index)} className="w-full text-left p-3">
        {title}
      </button>
      {openIndex === index && <div className="p-3">{children}</div>}
    </div>
  );
}`,
      },
      {
        title: "useLocalStorage Hook",
        type: "snippet",
        language: "typescript",
        content: `import { useState, useEffect } from "react";

export function useLocalStorage<T>(
  key: string,
  initialValue: T
): [T, (value: T | ((prev: T) => T)) => void] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") return initialValue;
    try {
      const item = window.localStorage.getItem(key);
      return item ? (JSON.parse(item) as T) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(key, JSON.stringify(storedValue));
    } catch {
      console.warn(\`Failed to save "\${key}" to localStorage\`);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Usage:
// const [theme, setTheme] = useLocalStorage("theme", "dark");`,
      },
    ],
  },
  {
    name: "AI Workflows",
    description: "AI prompts and workflow automations",
    items: [
      {
        title: "Code Review Prompt",
        type: "prompt",
        isPinned: true,
        isFavorite: true,
        content: `Review the following code for:

1. **Bugs & Logic Errors** — race conditions, off-by-one, null derefs
2. **Security** — injection, auth bypass, data exposure
3. **Performance** — unnecessary re-renders, N+1 queries, memory leaks
4. **Readability** — naming, structure, dead code
5. **Edge Cases** — empty inputs, concurrent access, error paths

For each issue found, provide:
- Severity (critical / warning / suggestion)
- Location (file + line)
- What's wrong and why
- Concrete fix with code

If everything looks good, say so — don't invent problems.`,
      },
      {
        title: "Documentation Generator Prompt",
        type: "prompt",
        content: `Generate documentation for the following code:

## Requirements
- Write a brief **summary** (1-2 sentences) of what this module/function does
- Document all **parameters** with types and descriptions
- Document the **return value**
- Add **usage examples** showing common patterns
- Note any **side effects** or **throws** behavior
- Keep language concise and developer-friendly

## Style
- Use JSDoc/TSDoc format for inline docs
- Use Markdown for standalone docs
- Prefer examples over lengthy explanations
- Include TypeScript types where applicable`,
      },
      {
        title: "Refactoring Assistant Prompt",
        type: "prompt",
        content: `Refactor the following code with these goals:

1. **Reduce complexity** — break up long functions, flatten nesting
2. **Improve naming** — variables, functions, and types should be self-documenting
3. **Extract patterns** — identify repeated logic and consolidate
4. **Type safety** — eliminate \`any\`, add missing types, use discriminated unions
5. **Modern syntax** — use optional chaining, nullish coalescing, destructuring

## Rules
- Preserve all existing behavior (no feature changes)
- Keep the same public API / exports
- Each change should be a small, reviewable step
- Explain the "why" behind each refactor`,
      },
    ],
  },
  {
    name: "DevOps",
    description: "Infrastructure and deployment resources",
    items: [
      {
        title: "Multi-Stage Docker Build",
        type: "snippet",
        language: "dockerfile",
        content: `# Stage 1: Dependencies
FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --only=production

# Stage 2: Build
FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
RUN npm run build

# Stage 3: Production
FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs
EXPOSE 3000
ENV PORT=3000

CMD ["node", "server.js"]`,
      },
      {
        title: "Deploy to Production",
        type: "command",
        content: `#!/bin/bash
set -euo pipefail

echo "=== Pre-deploy checks ==="
npm run lint
npm run test
npm run build

echo "=== Running database migrations ==="
DATABASE_URL="$PRODUCTION_DATABASE_URL" npx prisma migrate deploy

echo "=== Deploying to Vercel ==="
vercel --prod

echo "=== Deploy complete ==="`,
      },
      {
        title: "Vercel Documentation",
        type: "link",
        url: "https://vercel.com/docs",
        description: "Official Vercel deployment documentation — frameworks, environment variables, serverless functions, and edge config.",
      },
      {
        title: "GitHub Actions Workflow Syntax",
        type: "link",
        url: "https://docs.github.com/en/actions/writing-workflows/workflow-syntax-for-github-actions",
        description: "Complete reference for GitHub Actions workflow YAML syntax — triggers, jobs, steps, matrix strategies, and reusable workflows.",
      },
    ],
  },
  {
    name: "Terminal Commands",
    description: "Useful shell commands for everyday development",
    items: [
      {
        title: "Git Interactive Rebase & Cleanup",
        type: "command",
        isPinned: true,
        content: `# Interactive rebase last N commits
git rebase -i HEAD~5

# Squash all commits on current branch into one
git reset --soft $(git merge-base HEAD main) && git commit

# Delete all merged local branches
git branch --merged main | grep -v "main" | xargs -n 1 git branch -d

# Undo last commit (keep changes staged)
git reset --soft HEAD~1

# Find commits that modified a specific file
git log --follow --oneline -- path/to/file`,
      },
      {
        title: "Docker Container Management",
        type: "command",
        content: `# Stop and remove all containers
docker stop $(docker ps -aq) && docker rm $(docker ps -aq)

# Remove all unused images, networks, and volumes
docker system prune -af --volumes

# View logs for a container (follow + timestamps)
docker logs -f --timestamps <container_name>

# Execute a shell inside a running container
docker exec -it <container_name> /bin/sh

# List containers with custom format
docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"`,
      },
      {
        title: "Process & Port Management",
        type: "command",
        content: `# Find process using a specific port
lsof -i :3000

# Kill process on a specific port
kill -9 $(lsof -t -i :3000)

# Monitor system resources in real-time
top -o cpu -n 20

# Watch a command output every 2 seconds
watch -n 2 'docker ps --format "table {{.Names}}\t{{.Status}}"'

# Find large files in current directory
find . -type f -size +100M -exec ls -lh {} +`,
      },
      {
        title: "Package Manager Utilities",
        type: "command",
        content: `# Check for outdated packages
npm outdated

# List all globally installed packages
npm list -g --depth=0

# Check why a package is installed (dependency tree)
npm explain <package_name>

# Clean npm cache
npm cache clean --force

# Audit and fix vulnerabilities
npm audit && npm audit fix

# Run a script from a package without installing
npx --yes <package_name>@latest`,
      },
    ],
  },
  {
    name: "Design Resources",
    description: "UI/UX resources and references",
    items: [
      {
        title: "Tailwind CSS Documentation",
        type: "link",
        isPinned: true,
        isFavorite: true,
        url: "https://tailwindcss.com/docs",
        description: "Official Tailwind CSS docs — utility classes, configuration, responsive design, dark mode, and plugin authoring.",
      },
      {
        title: "shadcn/ui Components",
        type: "link",
        url: "https://ui.shadcn.com/docs/components",
        description: "Beautifully designed, accessible components built with Radix UI and Tailwind CSS. Copy-paste into your project.",
      },
      {
        title: "Apple Human Interface Guidelines",
        type: "link",
        url: "https://developer.apple.com/design/human-interface-guidelines",
        description: "Apple's design system covering layout, typography, color, icons, and platform-specific patterns for building intuitive interfaces.",
      },
      {
        title: "Lucide Icons",
        type: "link",
        url: "https://lucide.dev/icons",
        description: "Beautiful, consistent open-source icon library. Fork of Feather Icons with 1500+ icons. Used by shadcn/ui.",
      },
    ],
  },
] as const;

// ─── Main Seed Function ─────────────────────────────────────────────

async function main() {
  console.log("🌱 Starting seed...\n");

  // 1. Create demo user
  console.log("Creating demo user...");
  const hashedPassword = await bcrypt.hash("12345678", 12);

  const user = await prisma.user.upsert({
    where: { email: "demo@devstash.io" },
    update: {
      name: "Demo User",
      password: hashedPassword,
      emailVerified: new Date(),
    },
    create: {
      email: "demo@devstash.io",
      name: "Demo User",
      password: hashedPassword,
      isPro: false,
      emailVerified: new Date(),
    },
  });
  console.log(`  ✓ ${user.name} (${user.email})\n`);

  // 2. Create system item types
  console.log("Creating system item types...");
  const typeMap = new Map<string, string>();

  for (const type of systemItemTypes) {
    const itemType = await prisma.itemType.upsert({
      where: { userId_name: { userId: user.id, name: type.name } },
      update: { icon: type.icon, color: type.color, isSystem: true },
      create: {
        name: type.name,
        icon: type.icon,
        color: type.color,
        isSystem: true,
        userId: user.id,
      },
    });
    typeMap.set(type.name, itemType.id);
    console.log(`  ✓ ${type.name} (${type.icon}, ${type.color})`);
  }
  console.log();

  // 3. Clean up existing demo data (items, collections) for idempotent re-runs
  console.log("Cleaning existing demo items and collections...");
  await prisma.itemCollection.deleteMany({
    where: { collection: { userId: user.id } },
  });
  await prisma.item.deleteMany({ where: { userId: user.id } });
  await prisma.collection.deleteMany({ where: { userId: user.id } });
  console.log("  ✓ Cleaned\n");

  // 4. Create collections and items
  console.log("Creating collections and items...");

  for (const col of collections) {
    const collection = await prisma.collection.create({
      data: {
        name: col.name,
        description: col.description,
        userId: user.id,
      },
    });
    console.log(`\n  📁 ${col.name}`);

    for (const item of col.items) {
      const typeId = typeMap.get(item.type);
      if (!typeId) {
        console.error(`    ✗ Unknown type "${item.type}" for "${item.title}"`);
        continue;
      }

      const isLink = item.type === "link";

      const createdItem = await prisma.item.create({
        data: {
          title: item.title,
          contentType: isLink ? "text" : "text",
          content: "content" in item ? item.content : undefined,
          url: "url" in item ? item.url : undefined,
          description: "description" in item ? item.description : undefined,
          language: "language" in item ? item.language : undefined,
          isPinned: "isPinned" in item ? item.isPinned : false,
          isFavorite: "isFavorite" in item ? item.isFavorite : false,
          userId: user.id,
          typeId,
        },
      });

      await prisma.itemCollection.create({
        data: {
          itemId: createdItem.id,
          collectionId: collection.id,
        },
      });

      console.log(`    ✓ ${item.title} (${item.type})`);
    }
  }

  console.log("\n✅ Seed complete!");
}

main()
  .catch((e) => {
    console.error("Seed failed:", e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
