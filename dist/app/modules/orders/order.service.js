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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const order_model_1 = require("./order.model");
const http_status_1 = __importDefault(require("http-status"));
const product_model_1 = require("../products/product.model");
const AppError_1 = __importDefault(require("../../errors/AppError"));
const QueryBuilder_1 = __importDefault(require("../../builder/QueryBuilder"));
const createOrderToDB = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    const productsToOrder = orderData.products;
    const inventoryUpdates = productsToOrder.map((item) => __awaiter(void 0, void 0, void 0, function* () {
        const productInStock = yield product_model_1.ProductModel.findById(item.productId);
        if (!productInStock ||
            productInStock.AvailableQuantity < item.productQuantity) {
            throw new AppError_1.default(http_status_1.default.INTERNAL_SERVER_ERROR, "Product is unavailable or not enough quantity");
        }
        productInStock.AvailableQuantity -= item.productQuantity;
        yield productInStock.save();
    }));
    yield Promise.all(inventoryUpdates);
    const newOrder = yield order_model_1.Order.create(orderData);
    return newOrder;
});
const getAllOrdersFromDB = (query) => __awaiter(void 0, void 0, void 0, function* () {
    const OrderQuery = new QueryBuilder_1.default(order_model_1.Order.find(), query);
    const result = yield OrderQuery.modelQuery;
    return result;
});
exports.orderServices = { createOrderToDB, getAllOrdersFromDB };
