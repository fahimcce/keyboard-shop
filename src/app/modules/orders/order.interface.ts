import { z } from "zod";
import { OrderValidations } from "./order.validation";

export type TOrder = z.infer<
  typeof OrderValidations.CreateOrderValidationSchema
>;
