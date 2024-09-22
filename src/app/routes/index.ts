import { Router } from "express";
import { ProductRoutes } from "../modules/products/product.route";
import { OrderRoutes } from "../modules/orders/order.route";

const router = Router();

const moduleRoutes = [
  {
    path: "/products",
    route: ProductRoutes,
  },
  {
    path: "/orders",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
