import { CartRepository } from "../repositories/cartRepository";
import { Cart } from "../models/cart";
import { DateUtils } from "../../shared/utils/DateUtils";

class cartService {
  public static async getAllCarts(): Promise<Cart[]> {
    try {
      return await CartRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener los carritos: ${error.message}`);
    }
  }

  public static async getCartById(cartId: number): Promise<Cart | null> {
    try {
      return await CartRepository.findById(cartId);
    } catch (error: any) {
      throw new Error(`Error al encontrar el carrito: ${error.message}`);
    }
  }

  public static async addCart(cart: Cart) {
    try {
      if (!cart.created_at) {
        cart.created_at = DateUtils.formatDate(new Date());
      }
      return await CartRepository.createCart(cart);
    } catch (error: any) {
      throw new Error(`Error al crear el carrito: ${error.message}`);
    }
  }

  public static async modifyCart(cartId: number, cartData: Cart): Promise<Cart | null> {
    try {
      const cartFinded = await CartRepository.findById(cartId);

      if (cartFinded) {
        if (cartData.user_id !== undefined) {
          cartFinded.user_id = cartData.user_id;
        }
        if (cartData.total_price !== undefined) {
          cartFinded.total_price = cartData.total_price;
        }
        if (cartData.updated_at !== undefined) {
          cartFinded.updated_at = DateUtils.formatDate(new Date());
        }

        return await CartRepository.updateCart(cartId, cartFinded);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar el carrito: ${error.message}`);
    }
  }

  public static async deleteCart(cartId: number): Promise<boolean> {
    try {
      return await CartRepository.deleteCart(cartId);
    } catch (error: any) {
      throw new Error(`Error al eliminar el carrito: ${error.message}`);
    }
  }
}

export default cartService;
