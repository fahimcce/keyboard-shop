import { z } from "zod";

const CreateOrderValidationSchema = z.object({
  name: z.string({ required_error: "Name Is Required" }),
  email: z.string().email("Invalid Email address"),
  address: z.string({ required_error: "Address Is Required" }),
  phone: z.string({ required_error: "Phone Number is required" }),
  paymentMethod: z.string({ required_error: "Payment method Is Required" }),
  products: z.array(
    z.object({
      productId: z.string({ required_error: "product id is required" }),
      productQuantity: z.number().min(1, "Qunatity is required"),
    })
  ),
  totalAmout: z.number().min(1, "Total Amount is required"),
});
export const OrderValidations = { CreateOrderValidationSchema };
