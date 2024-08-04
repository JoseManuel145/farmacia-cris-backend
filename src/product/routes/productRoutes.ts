import { Router } from "express";
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByIdClient,
} from "../controllers/productController";
import { authClienteMiddleware } from "../../shared/middlewares/authClienteMiddleware";
import { authMiddleware } from "../../shared/middlewares/auth";
import upload from "../../shared/middlewares/uploadMiddleware";

const productRoutes: Router = Router();

productRoutes.get("/admin/", authMiddleware, getProducts);
productRoutes.get("/admin/:product_id", authMiddleware, getProductById);
productRoutes.get("/client/", getProducts);
productRoutes.get("/:product_id", authMiddleware, getProductById);
productRoutes.get("/client/:product_id", authClienteMiddleware, getProductById);
productRoutes.post("/", authMiddleware, upload.single("img"), createProduct);
productRoutes.put(
  "/:product_id",
  authMiddleware,
  upload.single("img"),
  updateProduct
);
productRoutes.delete("/:product_id", authMiddleware, deleteProduct);

export default productRoutes;
