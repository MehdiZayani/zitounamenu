import { seedDatabase } from "../lib/seedData";

async function main() {
  console.log("Starting database seeding...");
  const result = await seedDatabase(false);
  console.log(result.message);
}

main()
  .catch((e) => {
    console.error("Error seeding database:", e);
    process.exit(1);
  })
  .finally(() => {
    process.exit(0);
  });
