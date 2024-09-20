import QueryBuilder from "../../builder/QueryBuilder";
import { searchField } from "../../utils/searchField";
import { Tproducts } from "./product.interface";
import { ProductModel } from "./product.model";

const createProductToDB = async (payload: Tproducts) => {
  const result = await ProductModel.create(payload);
  return result;
};

const getAllProductFromDB = async (query: Record<string, unknown>) => {
  const productQuery = new QueryBuilder(
    ProductModel.find({ isDeleted: false }),
    query
  )
    .search(searchField)
    .filter()
    .sort()
    .fields()
    .paginate()
    .range();

  const result = await productQuery.modelQuery;
  const totalDocument = await ProductModel.countDocuments({ isDeleted: false });
  return { result, totalDocument };
};

const getSingleProductFromDB = async (id: string) => {
  const result = await ProductModel.findById(id);
  return result;
};

const updateProductToDB = async (id: string, payload: Partial<Tproducts>) => {
  const {
    Title,
    Brand,
    Image,
    AvailableQuantity,
    Price,
    Rating,
    Description,
    ...remainingProductData
  } = payload;

  const modifiedUpdateData: Record<string, unknown> = {
    ...remainingProductData,
  };

  // Directly assign if they are strings
  if (Title) {
    modifiedUpdateData.Title = Title;
  }

  if (Brand) {
    modifiedUpdateData.Brand = Brand;
  }

  if (Image) {
    modifiedUpdateData.Image = Image;
  }

  if (AvailableQuantity !== undefined) {
    // Check for both null and undefined
    modifiedUpdateData.AvailableQuantity = AvailableQuantity;
  }

  if (Price !== undefined) {
    modifiedUpdateData.Price = Price;
  }

  if (Rating !== undefined) {
    modifiedUpdateData.Rating = Rating;
  }

  if (Description) {
    modifiedUpdateData.Description = Description;
  }

  const result = await ProductModel.findByIdAndUpdate(id, modifiedUpdateData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteProductFromDb = async (id: string) => {
  const result = await ProductModel.findByIdAndUpdate(
    id,
    { isDeleted: true },
    { new: true }
  );
  return result;
};

export const ProductServices = {
  createProductToDB,
  getAllProductFromDB,
  getSingleProductFromDB,
  updateProductToDB,
  deleteProductFromDb,
};
