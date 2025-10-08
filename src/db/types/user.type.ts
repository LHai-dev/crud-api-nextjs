import { z } from "zod/v4";

export const USER_GENDER = {
  MALE: "Male",
  FEMALE: "Female",
  OTHER: "Other",
} as const;

export const UserGenderEnum = z.enum([
  USER_GENDER.MALE,
  USER_GENDER.FEMALE,
  USER_GENDER.OTHER,
]);

export const UserSchema = z.object({
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "firstname name must be at least 2 characters.",
  }),
  gender: z.enum([USER_GENDER.FEMALE, USER_GENDER.MALE, USER_GENDER.OTHER], {
    message: "Please select a valid gender",
  }),
  age: z
    .number()
    .min(18, { message: "Age must be at least 18." })
    .max(100, { message: "Age must be less than or equal to 100." }),
  phoneNumber: z.string(),
});

export const userQuerySchema = z.object({
  search: z.string().optional(),
  sortBy: z
    .enum(["firstName", "lastName", "age", "phoneNumber"])
    .default("firstName"),
  sortOrder: z.enum(["asc", "desc"]).default("asc"),
});

export const USER_ROLE = {
  ADMIN: "admin",
  USER: "user",
  SUPER_ADMIN: "super_admin",
} as const;

export const UserRoleEnum = z.enum([
  USER_ROLE.ADMIN,
  USER_ROLE.USER,
  USER_ROLE.SUPER_ADMIN,
]);

export type UserGender = (typeof USER_GENDER)[keyof typeof USER_GENDER];

export type UserRole = (typeof USER_ROLE)[keyof typeof USER_ROLE];

export type UserCreate = z.infer<typeof UserSchema>;
