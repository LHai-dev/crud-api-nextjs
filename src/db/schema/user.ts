import { sql } from "drizzle-orm";
import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";
import { UserGender } from "../types/user.type";



export const userTable = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  fullname: text().notNull(),
  age: integer().notNull(),
  gender: text({ enum: [UserGender.FEMALE, UserGender.MALE, UserGender.OTHER] }).notNull(),
  createdAt: text().default(sql`(CURRENT_DATE)`),
  updatedAt: text().default(sql`(CURRENT_DATE)`),
});

export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable);
export const userUpdateSchema = createUpdateSchema(userTable);

export type User = z.infer<typeof userSelectSchema>;
export type NewUser = z.infer<typeof userInsertSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;