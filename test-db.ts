import { PrismaClient } from "./src/generated/client";
import { PrismaBetterSqlite3 } from "@prisma/adapter-better-sqlite3";
const adapter = new PrismaBetterSqlite3({ url: "prisma/dev.db" });
const prisma = new PrismaClient({ adapter });

async function main() {
  try {
    const count = await prisma.brief.count();
    console.log("Brief count:", count);
  } catch (error) {
    console.error("Connection error:", error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
