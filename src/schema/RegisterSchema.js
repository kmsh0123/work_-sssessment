
import { z } from "zod";
import { checkSpace } from "../helpers/checkSpace";

export const RegisterSchema = z
  .object({
    name: z
      .string({
        invalid_type_error: "Name must be string!",
      })
      .min(1, { message: "Name is required!" })
      .min(2, "Name must have at least 2 letters!")
      .trim(),

    email: z
      .string({
        invalid_type_error: "Email must be string!",
      })
      .min(1, { message: "Email is required!" })
      .email("Invalid email!")
      .trim()
      .refine(checkSpace, "Email can't contain spaces!"),

    password: z
      .string({
        invalid_type_error: "Password must be string!",
      })
      .min(1, { message: "Password is required!" })
      .min(8, "Password must have at least 8 letters!")
      .trim()
      .refine(checkSpace, "Password can't contain spaces!"),

    confirm_password: z
      .string({
        invalid_type_error: "Confirm Password must be string!",
      })
      .min(1, { message: "Confirm Password is required!" })
      .min(8, "Confirm Password must have at least 8 letters!")
      .trim()
      .refine(checkSpace, "Confirm Password can't contain spaces!"),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "Confirm password must be same as password!",
    path: ["confirm_password"],
  });