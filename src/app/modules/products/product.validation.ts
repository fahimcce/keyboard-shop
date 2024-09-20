import { z } from "zod";

const CreateProductValidationSchema = z.object({
  body: z.object({
    Image: z.string({ required_error: "Image is required" }),
    Title: z.string({ required_error: "Title is required" }),
    Brand: z.string({ required_error: "Brand is required" }),
    AvailableQuantity: z
      .number({ required_error: "Available Quantity is required" })
      .min(0, { message: "Available Quantity must be a non-negative number" }),
    Price: z
      .number({ required_error: "Price is required" })
      .positive({ message: "Price must be greater than zero" }),
    Rating: z
      .number({ required_error: "Rating is required" })
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating cannot exceed 5" }),
    Description: z.string({ required_error: "Description is required" }),
    isDeleted: z.boolean().optional(),
  }),
});

const UpdateProductValidationSchema = z.object({
  body: z.object({
    Image: z.string().optional(),
    Title: z.string().optional(),
    Brand: z.string().optional(),
    AvailableQuantity: z
      .number()
      .min(0, { message: "Available Quantity must be a non-negative number" })
      .optional(),
    Price: z
      .number()
      .positive({ message: "Price must be greater than zero" })
      .optional(),
    Rating: z
      .number()
      .min(0, { message: "Rating must be at least 0" })
      .max(5, { message: "Rating cannot exceed 5" })
      .optional(),
    Description: z.string().optional(),
    isDeleted: z.boolean().optional(),
  }),
});

export const ProductValidaions = {
  CreateProductValidationSchema,
  UpdateProductValidationSchema,
};
