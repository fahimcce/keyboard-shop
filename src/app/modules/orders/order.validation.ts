import { z } from "zod";

const ProductSchema = z.object({
  Id: z.string({ required_error: "Product ID is required" }),
  Quantity: z.number({ required_error: "Quantity is required" }),
});

const CreateOrderValidationSchema = z.object({
  name: z.string({ required_error: "Name is required" }),
  email: z
    .string({ required_error: "Email is required" })
    .email({ message: "Invalid email address" }),
  phone: z.string({ required_error: "Phone number is required" }),
  address: z.string({ required_error: "Address is required" }),
  paymentMethod: z.string({ required_error: "Payment method is required" }),
  products: z.array(ProductSchema),
  totalAmount: z.number({ required_error: "Total amount is required" }),
});

export const OrderValidations = { CreateOrderValidationSchema };
