import z from "zod";
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
    .max(100, { message: "Age must be less than or equal to 100." }),
  phoneNumber: z
    .string()
    // .regex(
    //   /^\+855[1-9]\d{7,8}$/,
    //   'Phone number must be in international format starting with +855 followed by 8 or 9 digits (e.g., +85512345678 or +855912345678)'
    // ),
});

export type FormInfo = z.infer<typeof FormSchema>