import { z } from "zod/v4";

export const UserGender = {
  MALE: "Male",
  FEMALE: "Female",
  PREFER_NOT_TO_SAY: "Prefer not to say",
  NOT_SPECIFIED: "Not specified",
  OTHER: "Other",
} as const;

export const UserGenderEnum = z.enum([
  UserGender.MALE,
  UserGender.FEMALE,
  UserGender.PREFER_NOT_TO_SAY,
  UserGender.NOT_SPECIFIED,
]);

export const UserSchema = z.object({
  fullname: z.string().min(1, "Full name is required"),
  gender: UserGenderEnum,
  age: z
    .number()
    .min(0, "Age must be at least 0")
    .max(120, "Age must be at most 120"),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export type UserCreate = z.infer<typeof UserSchema>;
