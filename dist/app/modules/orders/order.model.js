"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const mongoose_1 = require("mongoose");
const orderSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    products: [
        {
            productId: { type: String, ref: "Products", required: true, min: 1 },
            productQuantity: { type: Number, required: true },
            _id: false,
        },
    ],
    totalAmout: { type: Number, required: true },
}, { timestamps: true });
exports.Order = (0, mongoose_1.model)("order", orderSchema);
