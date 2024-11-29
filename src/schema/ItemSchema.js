import { z } from "zod";
import { checkSpace } from "../helpers/checkSpace";

export const ItemSchema = z.object({
  title: z
    .string({
      invalid_type_error: "Title must be string!",
    })
    .min(1, { message: "Title is required" })
    .trim(),

    description: z
    .string({
      invalid_type_error: "Description must be string!",
    })
    .min(1, { message: "Description is required" })
    .trim(),

    category: z
    .string({
      invalid_type_error: "Category must be string!",
    })
    .min(1, { message: "Category is required" })
    .trim()

});