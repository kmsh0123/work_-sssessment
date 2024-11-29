import { z } from "zod";
import { checkSpace } from "../helpers/checkSpace";

export const LoginSchema = z.object({
  email: z
    .string({
      invalid_type_error: "Email must be string!",
    })
    .min(1, { message: "Email is required" })
    .email("Invalid email!")
    .trim()
    .refine(checkSpace, "Email can't contain spaces!"),

  password: z
    .string({
      invalid_type_error: "Password must be string!",
    })
    .min(1, { message: "Password is required" })
    .trim()
    .min(8, "Password must have at least 8 letters!")
    .refine(checkSpace, "Password can't contain spaces!"),
});