import { model, Schema } from "mongoose";
import { Tproducts } from "./product.interface";

const productSchema = new Schema<Tproducts>(
  {
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
  },
  {
    timestamps: true,
  }
);

export const ProductModel = model<Tproducts>("Products", productSchema);
