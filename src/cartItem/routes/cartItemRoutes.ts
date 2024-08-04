import { Router } from "express";
import {
  getCartItems,
  getCartItemById,
  createCartItem,
  updateCartItem,
  deleteCartItem,
  getImg,
  getCarH
} from "../controllers/cartItemController";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authClienteMiddleware } from "../../shared/middlewares/authClienteMiddleware";
const cartItemRoutes: Router = Router();

cartItemRoutes.get("/admin/", authMiddleware, getCartItems);
cartItemRoutes.get("/admin/:cart_item_id", authMiddleware, getCartItemById);
cartItemRoutes.post("/admin/", authMiddleware, createCartItem);
cartItemRoutes.put("/admin/:cart_item_id", authMiddleware, updateCartItem);
cartItemRoutes.delete("/admin/:cart_item_id", authMiddleware, deleteCartItem);

cartItemRoutes.get("/imgs", getImg);
cartItemRoutes.get("/", authClienteMiddleware, getCartItems);
cartItemRoutes.get("/historial/:id_user", authClienteMiddleware, getCarH);
cartItemRoutes.get("/:cart_item_id", authClienteMiddleware, getCartItemById);
cartItemRoutes.post("/", authClienteMiddleware, createCartItem);
cartItemRoutes.put("/:cart_item_id", authClienteMiddleware, updateCartItem);
cartItemRoutes.delete("/:cart_item_id", authClienteMiddleware, deleteCartItem);

export default cartItemRoutes;
