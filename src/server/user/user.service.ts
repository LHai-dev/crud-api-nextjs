import { db, Dbtype } from "@/db";
import { UserRepository } from "./user.repository";
import { NewUser, UpdateUser, User, userInsertSchema } from "@/db/schema";
import {
  BadRequestException,
  ConflictException,
  NotFoundException,
} from "@/error";

export class UserService {
  private readonly repository: UserRepository;

  constructor(private database: Dbtype) {
    this.repository = new UserRepository(database);
  }
  async getAllUsers(): Promise<User[] | null> {
    return this.repository.findAll();
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
    return await this.repository.listUsers({ search, sortBy, sortOrder });
  }
  async getUserById(userId: number): Promise<User> {
    const user = await this.repository.findById(userId);

    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }

    return user;
  }

  async createUser(createUser: Omit<NewUser, "id">): Promise<void> {
    if (await this.repository.existPhoneNumber(createUser.phoneNumber)) {
      throw new ConflictException(
        `Phone number already in use ${createUser.phoneNumber}`
      );
    }

    await this.repository.create(createUser);
  }

  async updateUser(
    userId: number,
    updateUser: Partial<
      Pick<NewUser, "lastName" | "firstName" | "age" | "gender" | "phoneNumber">
    >
  ): Promise<void> {
    await this.getUserById(userId);
    if (updateUser.phoneNumber !== undefined) {
      const phoneExists = await this.repository.existPhoneNumber(
        updateUser.phoneNumber
      );
      if (phoneExists) {
        throw new ConflictException(
          `Phone number already in use ${updateUser.phoneNumber}`
        );
      }
    }
    await this.repository.update(userId, updateUser);
  }

  async deleteUser(userId: number): Promise<void> {
    await this.getUserById(userId);
    return this.repository.delete(userId);
  }
}

export const userService = new UserService(db);
