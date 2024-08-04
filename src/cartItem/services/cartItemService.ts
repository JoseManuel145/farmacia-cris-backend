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
  public static async getCarH(id:number): Promise<[]> {
    try {
      return await CartItemRepository.getCarH(id);
    } catch (error: any) {
      throw new Error(`Error al obtener los ítems del carrito: ${error.message}`);
    }
  }
  public static async getImgs(): Promise<CartItem[]> {
    try {
      return await CartItemRepository.getImgs();
    } catch (error: any) {
      throw new Error(`Error al obtener los ítems del carrito: ${error.message}`);
    }
  }

  public static async getCartItemById(cartItemId: number): Promise<CartItem[] | null> {
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
          cartItemFinded[0].product_id = cartItemData.product_id;
        }
        if (cartItemData.quantity !== undefined) {
          cartItemFinded[0].quantity = cartItemData.quantity;
        }
        if (cartItemData.price !== undefined) {
          cartItemFinded[0].price = cartItemData.price;
        }
        if (cartItemData.cart_id !== undefined) {
          cartItemFinded[0].cart_id = cartItemData.cart_id;
        }
        if (cartItemData.updated_at !== undefined) {
          cartItemFinded[0].updated_at = DateUtils.formatDate(new Date());
        }

        return await CartItemRepository.updateCartItem(cartItemId, cartItemFinded[0]);
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
