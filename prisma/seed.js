const { PrismaClient } = require("@prisma/client");
const { generateHash } = require("../lib/bcrypt");

const prisma = new PrismaClient();

const categories = [
  { name: "Action" },
  { name: "Crime" },
  { name: "Horror" },
  { name: "Fantasy" },
  { name: "Thriler" },
];
async function main() {
  for (const category of categories) {
    await prisma.category.create({
      data: category,
    });
  }
  await prisma.user.create({
    data: {
      username: "admin",
      email: "admin@gmail.com",
      password: await generateHash("admin"),
      role: "admin",
    },
  });
  console.log("Seed data success");
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
