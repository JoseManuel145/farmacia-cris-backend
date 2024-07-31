import { query } from '../../shared/config/database'; // Asegúrate de que query esté correctamente importado
import { CartItem } from '../models/cartItem';

export class CartItemRepository {

  public static async findAll(): Promise<CartItem[]> {
    try {
      const sql = 'SELECT * FROM cart_items';
      const [results]: any = await query(sql);
      return results as CartItem[];
    } catch (error) {
      console.error("Error fetching cart items:", error);
      throw error;
    }
  }

  public static async findById(cart_item_id: number): Promise<CartItem | null> {
    try {
      const sql = 'SELECT * FROM cart_items WHERE id = ?';
      const [results]: any = await query(sql, [cart_item_id]);
      if (results.length > 0) {
        return results[0] as CartItem;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding cart item by ID:", error);
      throw error;
    }
  }

  public static async createCartItem(cartItem: CartItem): Promise<CartItem> {
    try {
      const sql = 'INSERT INTO cart_items (product_id, quantity, price, cart_id, created_at) VALUES (?, ?, ?, ?, ?)';
      const createdAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        cartItem.product_id,
        cartItem.quantity,
        cartItem.price,
        cartItem.cart_id,
        createdAt
      ]);
      const createdCartItemId = result.insertId;
      return { ...cartItem, id: createdCartItemId, created_at: createdAt };
    } catch (error) {
      console.error("Error creating cart item:", error);
      throw error;
    }
  }

  public static async updateCartItem(cart_item_id: number, cartItemData: CartItem): Promise<CartItem | null> {
    try {
      const sql = 'UPDATE cart_items SET product_id = ?, quantity = ?, price = ?, cart_id = ?, updated_at = ? WHERE id = ?';
      const updatedAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        cartItemData.product_id,
        cartItemData.quantity,
        cartItemData.price,
        cartItemData.cart_id,
        updatedAt,
        cart_item_id
      ]);
      if (result.affectedRows > 0) {
        return { ...cartItemData, id: cart_item_id, updated_at: updatedAt };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating cart item:", error);
      throw error;
    }
  }

  public static async deleteCartItem(cart_item_id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM cart_items WHERE id = ?';
      const [result]: any = await query(sql, [cart_item_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting cart item:", error);
      throw error;
    }
  }
}
