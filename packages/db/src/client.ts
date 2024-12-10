import { drizzle } from "drizzle-orm/node-postgres";

import { Pool } from "pg";
import schema from "./schema";

const connectionString = process.env.POSTGRES_URL;

const pool = new Pool({ connectionString: connectionString });

export const db = drizzle(pool, {
  schema,
  logger: false,
});
export * from "drizzle-orm";

export { alias } from "drizzle-orm/pg-core";