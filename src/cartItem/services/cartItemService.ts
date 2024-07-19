import { CartItemRepository } from "../repositories/cartItemRepository";
import { CartItem } from "../models/cartItem";
import { DateUtils } from "../../shared/utils/DateUtils";

class cartItemService {
  public static async getAllCartItems(): Promise<CartItem[]> {
    try {
      return await CartItemRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener los ítems del carrito: ${error.message}`);
    }
  }

  public static async getCartItemById(cartItemId: number): Promise<CartItem | null> {
    try {
      return await CartItemRepository.findById(cartItemId);
    } catch (error: any) {
      throw new Error(`Error al encontrar el ítem del carrito: ${error.message}`);
    }
  }

  public static async addCartItem(cartItem: CartItem) {
    try {
      if (!cartItem.created_at) {
        cartItem.created_at = DateUtils.formatDate(new Date());
      }
      return await CartItemRepository.createCartItem(cartItem);
    } catch (error: any) {
      throw new Error(`Error al crear el ítem del carrito: ${error.message}`);
    }
  }

  public static async modifyCartItem(cartItemId: number, cartItemData: CartItem): Promise<CartItem | null> {
    try {
      const cartItemFinded = await CartItemRepository.findById(cartItemId);

      if (cartItemFinded) {
        if (cartItemData.product_id !== undefined) {
          cartItemFinded.product_id = cartItemData.product_id;
        }
        if (cartItemData.quantity !== undefined) {
          cartItemFinded.quantity = cartItemData.quantity;
        }
        if (cartItemData.price !== undefined) {
          cartItemFinded.price = cartItemData.price;
        }
        if (cartItemData.cart_id !== undefined) {
          cartItemFinded.cart_id = cartItemData.cart_id;
        }
        if (cartItemData.updated_at !== undefined) {
          cartItemFinded.updated_at = DateUtils.formatDate(new Date());
        }

        return await CartItemRepository.updateCartItem(cartItemId, cartItemFinded);
      } else {
        return null;
      }
    } catch (error: any) {
      throw new Error(`Error al modificar el ítem del carrito: ${error.message}`);
    }
  }

  public static async deleteCartItem(cartItemId: number): Promise<boolean> {
    try {
      return await CartItemRepository.deleteCartItem(cartItemId);
    } catch (error: any) {
      throw new Error(`Error al eliminar el ítem del carrito: ${error.message}`);
    }
  }
}

export default cartItemService;
