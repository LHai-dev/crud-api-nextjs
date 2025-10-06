export interface User {
  id: number;
  fullname: string;
  age: number;
  gender: string;
  createdAt: string;
  updatedAt: string;
}
import z from "zod";

export enum GenderType {
  MALE = "Male",
  FEMALE = "Female",
  OTHER = "Other",
}
export const FormSchema = z.object({
  lastname: z.string().min(2, {
    message: "lastname must be at least 2 characters.",
  }),
  firstname: z.string().min(2, {
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
    .min(1, "Phone number is required")
    .regex(/^[\+855]?[1-9][\d]{0,15}$/, "Invalid phone number format"),
});
