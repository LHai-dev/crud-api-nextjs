import { env } from "@/env";
import * as schema from "./schema";
import { drizzle, LibSQLDatabase } from "drizzle-orm/libsql";
import { createClient } from "@libsql/client";

const client = createClient({
  url: env.DATABASE_URL,
  authToken: env.DATABASE_TOKEN,
});

export type Dbtype = LibSQLDatabase<typeof schema>;

export const db = drizzle(client, { schema });