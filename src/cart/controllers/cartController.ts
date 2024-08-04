import { Request, Response } from "express";
import cartService from "../services/cartServices";

export const getCarts = async (_req: Request, res: Response) => {
  try {
    const carts = await cartService.getAllCarts();
    if (carts.length > 0) {
      res.status(200).json(carts);
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getCartById = async (req: Request, res: Response) => {
  try {
    const cart = await cartService.getCartById(
      parseInt(req.params.cart_id, 10)
    );
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createCart = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const { cliente_id, total_price, status } = req.body;

    if (!cliente_id && !total_price && !status) {
      console.log(33);
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newCart = await cartService.addCart(req.body);
    res.status(201).json(newCart);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCart = async (req: Request, res: Response) => {
  try {
    const updatedCart = await cartService.modifyCart(
      parseInt(req.params.cart_id, 10),
      req.body
    );
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateCartstatus = async (req: Request, res: Response) => {
  try {
    const updatedCart = await cartService.modifyCartstatus(
      parseInt(req.params.cart_id, 10)
    );
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const updateStatus = async (req: Request, res: Response) => {
  console.log(req.body);
  console.log(req.params);
  
  
  try {
    const updatedCart = await cartService.updateStatus(
      parseInt(req.params.cart_id, 10),
      req.body.status,
      Number(req.body.total_price)
    );
    console.log(updatedCart);
    
    if (updatedCart) {
      res.status(200).json(updatedCart);
    } else {
      res.status(404).json({ message: "Cart not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCart = async (req: Request, res: Response) => {
  try {
    const deleted = await cartService.deleteCart(
      parseInt(req.params.cart_id, 10)
    );
    if (deleted) {
      res.status(200).json({ message: "Cart deleted successfully" });
    } else {
      res.status(404).json({ message: "Cart not found or delete failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
