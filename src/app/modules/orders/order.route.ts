import { Router } from "express";
// import validateRequest from "../../middlewares/validRequest";
// import { OrderValidations } from "./order.validation";
import { orderControllers } from "./order.controller";

const router = Router();
router.post("/", orderControllers.createOrder);
router.get("/", orderControllers.getAllOrders);

export const OrderRoutes = router;
