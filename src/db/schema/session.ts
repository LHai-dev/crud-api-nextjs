import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { userTable } from "./user";
import { createInsertSchema } from "drizzle-zod";
import z from "zod";

export const sessionTable = sqliteTable("session", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  userAgent: text("user_agent"),
  ipAddress: text("ip_address"),
  userId: text("user_id")
    .notNull()
    .references(() => userTable.id),
});

export const insertSessionSchema = createInsertSchema(sessionTable);

export type Session = typeof sessionTable.$inferSelect & {
  fresh?: boolean;
};
export type NewSession = z.infer<typeof insertSessionSchema>;