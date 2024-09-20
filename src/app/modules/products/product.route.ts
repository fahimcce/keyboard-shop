import express from "express";
import { ProductController } from "./product.controller";
import validateRequest from "../../middlewares/validRequest";
import { ProductValidaions } from "./product.validation";

const router = express.Router();

router.post(
  "/",
  validateRequest(ProductValidaions.CreateProductValidationSchema),
  ProductController.createProduct
);
router.get("/", ProductController.getAllProducts);
router.get("/:id", ProductController.getSingleProduct);
router.patch(
  "/:id",
  validateRequest(ProductValidaions.UpdateProductValidationSchema),
  ProductController.updateProduct
);
router.delete("/:id", ProductController.deleteProduct);

export const ProductRoutes = router;
