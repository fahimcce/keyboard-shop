"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductValidaions = void 0;
const zod_1 = require("zod");
const CreateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        Image: zod_1.z.string({ required_error: "Image is required" }),
        Title: zod_1.z.string({ required_error: "Title is required" }),
        Brand: zod_1.z.string({ required_error: "Brand is required" }),
        AvailableQuantity: zod_1.z
            .number({ required_error: "Available Quantity is required" })
            .min(0, { message: "Available Quantity must be a non-negative number" }),
        Price: zod_1.z
            .number({ required_error: "Price is required" })
            .positive({ message: "Price must be greater than zero" }),
        Rating: zod_1.z
            .number({ required_error: "Rating is required" })
            .min(0, { message: "Rating must be at least 0" })
            .max(5, { message: "Rating cannot exceed 5" }),
        Description: zod_1.z.string({ required_error: "Description is required" }),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
const UpdateProductValidationSchema = zod_1.z.object({
    body: zod_1.z.object({
        Image: zod_1.z.string().optional(),
        Title: zod_1.z.string().optional(),
        Brand: zod_1.z.string().optional(),
        AvailableQuantity: zod_1.z
            .number()
            .min(0, { message: "Available Quantity must be a non-negative number" })
            .optional(),
        Price: zod_1.z
            .number()
            .positive({ message: "Price must be greater than zero" })
            .optional(),
        Rating: zod_1.z
            .number()
            .min(0, { message: "Rating must be at least 0" })
            .max(5, { message: "Rating cannot exceed 5" })
            .optional(),
        Description: zod_1.z.string().optional(),
        isDeleted: zod_1.z.boolean().optional(),
    }),
});
exports.ProductValidaions = {
    CreateProductValidationSchema,
    UpdateProductValidationSchema,
};
