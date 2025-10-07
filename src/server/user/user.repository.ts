import { Dbtype } from "@/db";
import {
  NewUser,
  UpdateUser,
  User,
  userInsertSchema,
  userSelectSchema,
  userTable,
  userUpdateSchema,
} from "@/db/schema";
import { asc, desc, eq, like, or, SQL } from "drizzle-orm";
import z from "zod";

export class UserRepository {
  constructor(private readonly db: Dbtype) {}

  async findAll(): Promise<User[] | null> {
    const users = await this.db.select().from(userTable);
    return users;
  }

  async listUsers({
    search,
    sortBy,
    sortOrder,
  }: {
    search?: string;
    sortBy: "firstName" | "lastName" | "age" | "phoneNumber";
    sortOrder: "asc" | "desc";
  }) {
    const searchConditions = search
      ? or(
          like(userTable.firstName, `%${search}%`),
          like(userTable.lastName, `%${search}%`),
          like(userTable.phoneNumber, `%${search}%`)
        )
      : undefined;

    const order: SQL =
      sortOrder === "asc" ? asc(userTable[sortBy]) : desc(userTable[sortBy]);

    const users = await this.db
      .select()
      .from(userTable)
      .where(searchConditions)
      .orderBy(order);

    return users;
  }

  async findById(userId: number): Promise<User | null> {
    const row = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.id, userId))
      .limit(1);
    return row[0] ?? null;
  }

  async create(
    user: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {
    await this.db.insert(userTable).values(user);
  }

  async update(userId: number, user: Partial<User>): Promise<void> {
    await this.db
      .update(userTable)
      .set(user)
      .where(eq(userTable.id, userId));
  }

  async existPhoneNumber(phoneNumber: string): Promise<boolean> {
    const result = await this.db
      .select()
      .from(userTable)
      .where(eq(userTable.phoneNumber, phoneNumber))
      .limit(1);

    return result.length > 0;
  }

  async delete(userId: number): Promise<void> {
    await this.db.delete(userTable).where(eq(userTable.id, userId));
  }
}
