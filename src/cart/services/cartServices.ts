import { CartRepository } from "../repositories/cartRepository";
import { Cart } from "../models/cart";
import { DateUtils } from "../../shared/utils/DateUtils";
import { ClienteRepository } from "../../cliente/repositories/ClienteRepository";

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

    public static async addCart(cart: Cart): Promise<Cart> {
      try {
        // Verificar si el cliente existe
        const cliente = await ClienteRepository.findById(cart.cliente_id);
        if (!cliente) {
          throw new Error(`Cliente with ID ${cart.cliente_id} does not exist.`);
        }
  
        // Si el cliente existe, crear el carrito
        return await CartRepository.createCart(cart);
      } catch (error: any) {
        throw new Error(`Error al crear el carrito: ${error.message}`);
      }
    }

  public static async modifyCart(cartId: number, cartData: Cart): Promise<Cart | null> {
    try {
      const cartFinded = await CartRepository.findById(cartId);

      if (cartFinded) {
        if (cartData.cliente_id !== undefined) {
          cartFinded.cliente_id = cartData.cliente_id;
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
