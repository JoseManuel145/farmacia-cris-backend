import { Request, Response } from "express";
import cartItemService from "../services/cartItemService";
import cartService from "../../cart/services/cartServices";

export const getCartItems = async (_req: Request, res: Response) => {
  try {
    const cartItems = await cartItemService.getAllCartItems();
    if (cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getCarH = async (req: Request, res: Response) => {
  try {
    const cartItems = await cartItemService.getCarH(Number(req.params.id_user));
    if (cartItems.length > 0) {
      res.status(200).json(cartItems);
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getImg = async (_req: Request, res: Response) => {
  try {
    const cartItem = await cartItemService.getImgs();
    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartItemById = async (req: Request, res: Response) => {
  try {
    const cartItem = await cartItemService.getCartItemById(
      parseInt(req.params.cart_item_id, 10)
    );
    if (cartItem) {
      res.status(200).json(cartItem);
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCartItem = async (req: Request, res: Response) => {
  try {
    const { product_id, quantity, price, cart_id } = req.body;

    // Verificar si el cart_id existe
    const cart = await cartService.getCartById(cart_id);
    if (!cart) {
      return res.status(400).json({ message: "Invalid cart_id" });
    }

    // Proceder con la creación del CartItem
    const newCartItem = await cartItemService.addCartItem({
      product_id,
      quantity,
      price,
      cart_id,
      id: 0, // or generate a new id if necessary
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      deleted: false,
    });
    res.status(201).json(newCartItem);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCartItem = async (req: Request, res: Response) => {
  try {
    const updatedCartItem = await cartItemService.modifyCartItem(
      parseInt(req.params.cart_item_id, 10),
      req.body
    );
    if (updatedCartItem) {
      res.status(200).json(updatedCartItem);
    } else {
      res.status(404).json({ message: "Cart item not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCartItem = async (req: Request, res: Response) => {
  try {
    const deleted = await cartItemService.deleteCartItem(
      parseInt(req.params.cart_item_id, 10)
    );
    if (deleted) {
      res.status(200).json({ message: "Cart item deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart item not found or delete failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
