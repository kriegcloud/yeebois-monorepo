import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";

import * as schema from "./schema";


export { pgTable as tableCreator } from "./_table";

// eslint-disable-next-line @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
const pool = new Pool({
  connectionString: process.env.POSTGRES_URL,
})

export * from "drizzle-orm";

export const db = drizzle(pool, { schema });