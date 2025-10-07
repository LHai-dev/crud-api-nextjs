import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
import { UserGender } from "../types/user.type";

export const userTable = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  age: integer().notNull(),
  phoneNumber: text("phone_number").unique().notNull(),
  gender: text({
    enum: [UserGender.FEMALE, UserGender.MALE],
  }).notNull(),
});

export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable, {
  firstName: (schema) => schema.min(2).max(50),
  lastName: (schema) => schema.min(2).max(50),
  age: (schema) => schema.min(18).max(100),
  phoneNumber: (schema) =>
    schema.regex(
      /^\+855[1-9]\d{7,8}$/,
      'Phone number must be in international format starting with +855 followed by 8 or 9 digits (e.g., +85512345678 or +855912345678)'
    ),
});

export const userUpdateSchema = createUpdateSchema(userTable,{
  firstName: (schema) => schema.min(2).max(50),
  lastName: (schema) => schema.min(2).max(50),
  age: (schema) => schema.min(18).max(100),
  phoneNumber: (schema) =>
    schema.regex(
      /^\+855[1-9]\d{7,8}$/,
      'Phone number must be in international format starting with +855 followed by 8 or 9 digits (e.g., +85512345678 or +855912345678)'
    ),
});

export type User = z.infer<typeof userSelectSchema>;
export type NewUser = z.infer<typeof userInsertSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;