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
import { eq } from "drizzle-orm";
import z from "zod";

export class UserRepository {
  constructor(private readonly db: Dbtype) {}

  async findAll(): Promise<User[] | null> {
    const users = await this.db.select().from(userTable);
    const parsedUsers = z.array(userSelectSchema).parse(users);
    return parsedUsers;
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
  ): Promise<NewUser> {
    const [inserted] = await this.db.insert(userTable).values(user).returning();
    return userInsertSchema.parse(inserted);
  }
  async update(
    userId: number,
    user: Partial<User>
  ): Promise<UpdateUser> {
    const [updated] = await this.db
      .update(userTable)
      .set(user)
      .where(eq(userTable.id, userId))
      .returning();
    return userUpdateSchema.parse(updated);
  }
  async delete(userId: number): Promise<void> {
    await this.db.delete(userTable).where(eq(userTable.id, userId));
  }
}
