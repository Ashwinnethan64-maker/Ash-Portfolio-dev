import { drizzle } from "drizzle-orm/node-postgres";
import pg from "pg";
import * as schema from "@shared/schema";

const { Pool } = pg;

if (!process.env.DATABASE_URL) {
  console.warn(
    "Warning: DATABASE_URL is not set. The server will run, but database features will not work.",
  );
}

export const pool = new Pool({
  connectionString: process.env.DATABASE_URL || "postgres://localhost/mydb",
});
export const db = drizzle(pool, { schema });
