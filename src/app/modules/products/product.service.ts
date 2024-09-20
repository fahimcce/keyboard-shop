import { Tproducts } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDB = async (payload: Tproducts) => {
  const result = await ProductModel.create(payload);
  return result;
};
