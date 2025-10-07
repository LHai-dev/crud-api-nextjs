import z from "zod";
import { isValidPhoneNumber } from "react-phone-number-input";
export interface User {
  id: number;
  lastName: string;
  firstName: string;
  phoneNumber: string;
  age: number;
  gender: string;
}

export enum GenderType {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}
export const FormSchema = z.object({
  lastName: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  firstName: z.string().min(2, {
    message: "firstname name must be at least 2 characters.",
  }),
  gender: z.enum([GenderType.MALE, GenderType.FEMALE, GenderType.OTHER], {
    message: "Please select a valid gender",
  }),
  age: z
    .number()
    .min(18, { message: "Age must be at least 18." })
    .max(120, { message: "Age must be less than or equal to 120." }),
  phoneNumber: z
    .string()
    .refine(isValidPhoneNumber, { message: "Invalid phone number" }),
});

export type FormInfo = z.infer<typeof FormSchema>