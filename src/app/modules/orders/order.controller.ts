import httpStatus from "http-status";
import catchAsync from "../../utils/catchAsync";
import sendResponse from "../../utils/sendResponse";
import { orderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await orderServices.createOrderToDB(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order products Successfully",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req, res) => {
  const result = await orderServices.getAllOrdersFromDB(req.query);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Orders are retrieved succesfully",
    data: result,
  });
});

export const orderControllers = {
  createOrder,
  getAllOrders,
};
