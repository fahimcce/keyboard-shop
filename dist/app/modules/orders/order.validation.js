"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderValidations = void 0;
const zod_1 = require("zod");
const CreateOrderValidationSchema = zod_1.z.object({
    name: zod_1.z.string({ required_error: "Name Is Required" }),
    email: zod_1.z.string().email("Invalid Email address"),
    address: zod_1.z.string({ required_error: "Address Is Required" }),
    phone: zod_1.z.string({ required_error: "Phone Number is required" }),
    paymentMethod: zod_1.z.string({ required_error: "Payment method Is Required" }),
    products: zod_1.z.array(zod_1.z.object({
        productId: zod_1.z.string({ required_error: "product id is required" }),
        productQuantity: zod_1.z.number().min(1, "Qunatity is required"),
    })),
    totalAmout: zod_1.z.number().min(1, "Total Amount is required"),
});
exports.OrderValidations = { CreateOrderValidationSchema };
