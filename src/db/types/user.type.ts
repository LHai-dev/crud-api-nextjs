import { isValidPhoneNumber } from "react-phone-number-input";
import { z } from "zod/v4";

export const UserGender = {
  MALE: "Male",
  FEMALE: "Female"
} as const;

export const UserGenderEnum = z.enum([
  UserGender.MALE,
  UserGender.FEMALE
]);

export const UserSchema = z.object({
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
    message: "firstname name must be at least 2 characters.",
  }),
  gender: z.enum([UserGender.FEMALE, UserGender.MALE], {
    message: "Please select a valid gender",
  }),
  age: z
    .number()
    .min(18, { message: "Age must be at least 18." })
    .max(100, { message: "Age must be less than or equal to 100." }),
  phoneNumber: z
    .string()
});

export const userQuerySchema = z.object({
  search: z.string().optional(),
  sortBy: z.enum(['firstName', 'lastName', 'age', 'phoneNumber']).default('firstName'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export type UserCreate = z.infer<typeof UserSchema>;
