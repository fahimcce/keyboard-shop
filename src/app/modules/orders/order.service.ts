import { TOrder } from "./order.interface";
import { Order } from "./order.model";

import httpStatus from "http-status";
import { ProductModel } from "../products/product.model";
import AppError from "../../errors/AppError";
import QueryBuilder from "../../builder/QueryBuilder";

const createOrderToDB = async (orderData: TOrder) => {
  const productsToOrder = orderData.products;

  const inventoryUpdates = productsToOrder.map(async (item) => {
    const productInStock = await ProductModel.findById(item.productId);
    if (
      !productInStock ||
      productInStock.AvailableQuantity < item.productQuantity
    ) {
      throw new AppError(
        httpStatus.INTERNAL_SERVER_ERROR,
        "Product is unavailable or not enough quantity"
      );
    }
    productInStock.AvailableQuantity -= item.productQuantity;
    await productInStock.save();
  });

  await Promise.all(inventoryUpdates);
  const newOrder = await Order.create(orderData);
  return newOrder;
};

const getAllOrdersFromDB = async (query: Record<string, unknown>) => {
  const OrderQuery = new QueryBuilder(Order.find(), query);

  const result = await OrderQuery.modelQuery;
  return result;
};

export const orderServices = { createOrderToDB, getAllOrdersFromDB };
