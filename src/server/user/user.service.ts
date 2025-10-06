import { db, Dbtype } from "@/db";
import { UserRepository } from "./user.repository";
import { NewUser, UpdateUser, User, userInsertSchema } from "@/db/schema";
import { BadRequestException, NotFoundException } from "@/error";
import { get } from "http";
import { UserSchema } from "@/db/types/user.type";

export class UserService {
  private readonly repository: UserRepository;

  constructor(private database: Dbtype) {
    this.repository = new UserRepository(database);
  }
  async getAllUsers(): Promise<User[] | null> {
    return this.repository.findAll();
  }
  async getUserById(userId: number): Promise<User> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  async createUser(
    createUser: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {

    this.repository.create(createUser);
  }

  async updateUser(
    userId: number,
    updateUser: Partial<Pick<NewUser, "fullname" | "age" | "gender">>
  ): Promise<void> {
    await this.getUserById(userId);
    await this.repository.update(userId, updateUser);
  }

  async deleteUser(userId: number): Promise<void> {
    return this.repository.delete(userId);
  }
}

export const userService = new UserService(db);