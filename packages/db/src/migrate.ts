import { migrate } from "drizzle-orm/node-postgres/migrator";

import { db } from "./client";

async function main() {
  try {
    await migrate(db, { migrationsFolder: "./drizzle" });
    console.log("Migration complete");
    process.exit(0);
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}
main().then((r) => r);
