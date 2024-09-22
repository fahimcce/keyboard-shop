"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = require("mongoose");
const productSchema = new mongoose_1.Schema({
    Image: {
        type: String,
        required: true,
    },
    Title: {
        type: String,
        required: true,
    },
    Brand: {
        type: String,
        required: true,
    },
    AvailableQuantity: {
        type: Number,
        required: true,
    },
    Price: {
        type: Number,
        required: true,
    },
    Rating: {
        type: Number,
        required: true,
    },
    Description: {
        type: String,
        required: true,
    },
    isDeleted: {
        type: Boolean,
        default: false,
    },
}, {
    timestamps: true,
});
exports.ProductModel = (0, mongoose_1.model)("Products", productSchema);
