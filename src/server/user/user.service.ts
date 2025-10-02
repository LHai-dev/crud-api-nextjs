import { db, Dbtype } from "@/db";
import { UserRepository } from "./user.repository";
import { NewUser, UpdateUser, User } from "@/db/schema";

export class UserService {
  private readonly repository: UserRepository;

  constructor(private database: Dbtype) {
    this.repository = new UserRepository(database);
  }
  async getAllUsers(): Promise<User[] | null> {
    return this.repository.findAll();
  }
  async getUserById(userId: number): Promise<User | null> {
    return this.repository.findById(userId);
  }
  async createUser(
    createUser: Omit<User, "id" | "createdAt" | "updatedAt">
  ): Promise<void> {
     this.repository.create(createUser);
  }
  async updateUser(
    userId: number,
    updateUser: Partial<User>
  ): Promise<void> {
     this.repository.update(userId, updateUser);
  }
  async deleteUser(userId: number): Promise<void> {
    return this.repository.delete(userId);
  }
}

export const userService = new UserService(db);