import type { Config } from "drizzle-kit";

if (!process.env.POSTGRES_URL) {
  throw new Error("Missing POSTGRES_URL");
}

const nonPoolingUrl = process.env.POSTGRES_URL;
console.log(nonPoolingUrl);
export default {
  schema: "./src/schema.ts",
  dialect: "postgresql",
  dbCredentials: {
    url: nonPoolingUrl,
  },
  casing: "snake_case",
  tablesFilter: ["shaven_*"],
} satisfies Config;
