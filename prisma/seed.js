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

const movie = [
  {
    movie_title: "Kingdom Of The Planet Of The Apes",
    description: "Bertahun-tahun setelah pemerintahan .",
    movie_url:
      "https://tv.lk21official.online/kingdom-of-the-planet-of-the-apes-2024/",
    categoryId: 2,
  },
  {
    movie_title: "Bad Boys:Ride Or Die",
    description: "Ketika mendiang .",
    movie_url: "https://tv.lk21official.online/bad-boys-ride-or-die-2024/",
    categoryId: 2,
  },
];
async function main() {
  for (const category of categories) {
    const existingCategory = await prisma.category.findUnique({
      where: { name: category.name },
    });
    if (!existingCategory) {
      await prisma.category.create({
        data: category,
      });
      console.log(`Category ${category.name} created.`);
    } else {
      console.log(`Category ${category.name} already exists, Skipping`);
    }
  }
  for (const movies of movie) {
    const existingMovie = await prisma.film.findFirst({
      where: { movie_title: movies.movie_title },
    });
    if (!existingMovie) {
      await prisma.film.create({
        data: movies,
      });
      console.log(`Movie ${movie.movie_title} Created`);
    } else {
      console.log(`Movie ${movie.movie_title} already exist, Skipping`);
    }
  }
  const existingUser = await prisma.user.findUnique({
    where: {
      email: "admin@gmail.com",
    },
  });
  if (!existingUser) {
    await prisma.user.create({
      data: {
        username: "admin",
        email: "admin@gmail.com",
        password: await generateHash("admin"),
        role: "admin",
      },
    });
    console.log(`Admin user Created`);
  } else {
    console.log(`Admin user already exist, Skipping`);
  }
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
