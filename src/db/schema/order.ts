import { sql } from "drizzle-orm";
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core";
import { createInsertSchema, createSelectSchema, createUpdateSchema } from "drizzle-zod";
import z from "zod";

export const orderTable = sqliteTable("orders", {
  id: integer({ mode: "number" }).primaryKey({ autoIncrement: true }),
  userId: integer("user_id", { mode: "number" }).notNull(),
  productName: text("product_name").notNull(),
  quantity: integer("quantity").notNull(),
  price: real("price").notNull(),

  createdAt: text("created_at").default(sql`(CURRENT_TIMESTAMP)`),
  updatedAt: text("updated_at").default(sql`(CURRENT_TIMESTAMP)`),
});

export const orderSelectSchema = createSelectSchema(orderTable);
export const orderInsertSchema = createInsertSchema(orderTable);
export const orderUpdateSchema = createUpdateSchema(orderTable);

export type Order = z.infer<typeof orderSelectSchema>;
export type NewOrder = z.infer<typeof orderInsertSchema>;
export type UpdateOrder = z.infer<typeof orderUpdateSchema>;