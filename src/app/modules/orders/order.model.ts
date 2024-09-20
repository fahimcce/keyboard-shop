import mongoose, { model, Schema } from "mongoose";
import { Torder } from "./order.interface";

const orderSchema = new Schema<Torder>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    address: { type: String, required: true },
    paymentMethod: { type: String, required: true },
    products: [
      {
        Id: { type: String, ref: "Products", required: true, min: 1 },
        Quantity: { type: Number, required: true },
        _id: false,
      },
    ],
    totalAmount: { type: Number, required: true },
  },
  { timestamps: true }
);

export const Order = model<Torder>("orders", orderSchema);
