import prisma from "./configs/prisma.js";

async function main() {
  console.log("Testing Prisma Neon connection...");
  const count = await prisma.user.count();
  console.log(`Database connected successfully! Total users: ${count}`);
  await prisma.$disconnect();
}

main().catch((err) => {
  console.error("Database connection error:", err);
  process.exit(1);
});

