"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductServices = void 0;
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const searchField_1 = require("../../utils/searchField");
const product_model_1 = require("./product.model");
const createProductToDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // isExist product
    const isExistProduct = yield product_model_1.ProductModel.findOne({ Title: payload.Title });
    if (isExistProduct) {
        const result = yield product_model_1.ProductModel.findOneAndUpdate({ Title: payload.Title }, { $inc: { AvailableQuantity: payload.AvailableQuantity } }, { new: true, runValidators: true });
        return result;
    }
    const result = yield product_model_1.ProductModel.create(payload);
    return result;
});
const getAllProductFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const productQuery = new QueryBuilder_1.default(product_model_1.ProductModel.find({ isDeleted: false }), query)
        .search(searchField_1.searchField)
        .filter()
        .sort()
        .fields()
        .paginate()
        .range();
    const result = yield productQuery.modelQuery;
    const totalDocument = yield product_model_1.ProductModel.countDocuments({ isDeleted: false });
    return { result, totalDocument };
});
const getSingleProductFromDB = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findById(id);
    return result;
});
const updateProductToDB = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { Title, Brand, Image, AvailableQuantity, Price, Rating, Description } = payload, remainingProductData = __rest(payload, ["Title", "Brand", "Image", "AvailableQuantity", "Price", "Rating", "Description"]);
    const modifiedUpdateData = Object.assign({}, remainingProductData);
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
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, modifiedUpdateData, {
        new: true,
        runValidators: true,
    });
    return result;
});
const deleteProductFromDb = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.ProductModel.findByIdAndUpdate(id, { isDeleted: true }, { new: true });
    return result;
});
exports.ProductServices = {
    createProductToDB,
    getAllProductFromDB,
    getSingleProductFromDB,
    updateProductToDB,
    deleteProductFromDb,
};
