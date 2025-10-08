import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";
import {
  createInsertSchema,
  createSelectSchema,
  createUpdateSchema,
} from "drizzle-zod";
import z from "zod";
import { USER_GENDER, USER_ROLE, UserGender, UserRole } from "../types/user.type";
import { sql } from "drizzle-orm";

export const userTable = sqliteTable("users", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  lastName: text("last_name").notNull(),
  firstName: text("first_name").notNull(),
  email: text("email").unique().notNull(),
  avatar: text("avatar"),
  username: text("username").unique(),
  password: text("password"),
  description: text("description"),
  age: integer().notNull(),
  role: text("role").$type<UserRole>().notNull().default(USER_ROLE.USER),
  phoneNumber: text("phone_number").unique().notNull(),
  gender: text("gender").$type<UserGender>().notNull().default(USER_GENDER.MALE),
  createdAt: integer("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: integer("updated_at")
    .default(sql`(CURRENT_TIMESTAMP)`)
    .notNull(),
});
export const emailSchema = z.email().max(255).toLowerCase().trim();
export const usernameSchema = z.string().min(3).max(50).trim().toLowerCase();


export const userSelectSchema = createSelectSchema(userTable);
export const userInsertSchema = createInsertSchema(userTable, {
  firstName: (schema) => schema.min(2).max(50),
  lastName: (schema) => schema.min(2).max(50),
  age: (schema) => schema.min(18).max(100),
  email: emailSchema,
  username: usernameSchema
  // phoneNumber: (schema) =>
  // schema.regex(
  //   /^\+855[1-9]\d{7,8}$/,
  //   'Phone number must be in international format starting with +855 followed by 8 or 9 digits (e.g., +85512345678 or +855912345678)'
  // ),
});

export const userUpdateSchema = createUpdateSchema(userTable, {
  firstName: (schema) => schema.min(2).max(50),
  lastName: (schema) => schema.min(2).max(50),
  age: (schema) => schema.min(18).max(100),
  email: emailSchema,
  username: usernameSchema
  // phoneNumber: (schema) =>
  //   schema.regex(
  //     /^\+855[1-9]\d{7,8}$/,
  //     'Phone number must be in international format starting with +855 followed by 8 or 9 digits (e.g., +85512345678 or +855912345678)'
  //   ),
});

export type User = z.infer<typeof userSelectSchema>;
export type NewUser = z.infer<typeof userInsertSchema>;
export type UpdateUser = z.infer<typeof userUpdateSchema>;
