import { Cart } from '../models/cart';
import { query } from '../../shared/config/database'; // Asegúrate de importar correctamente

export class CartRepository {

  public static async findAll(): Promise<Cart[]> {
    try {
      const sql = 'SELECT * FROM carts';
      const [results]: any = await query(sql);
      return results as Cart[];
    } catch (error) {
      console.error("Error fetching carts:", error);
      throw error;
    }
  }

  public static async findById(cart_id: number): Promise<Cart | null> {
    try {
      const sql = 'SELECT * FROM carts WHERE id = ?';
      const [results]: any = await query(sql, [cart_id]);
      if (results.length > 0) {
        return results[0] as Cart;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding cart by ID:", error);
      throw error;
    }
  }

  public static async createCart(cart: Cart): Promise<Cart> {
    try {
      const sql = 'INSERT INTO carts (cliente_id, total_price, created_at) VALUES (?, ?, ?)';
      const createdAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        cart.cliente_id,
        cart.total_price,
        createdAt
      ]);
      const createdCartId = result.insertId;
      return { ...cart, id: createdCartId, created_at: createdAt };
    } catch (error) {
      console.error("Error creating cart:", error);
      throw error;
    }
  }

  public static async updateCart(cart_id: number, cartData: Cart): Promise<Cart | null> {
    try {
      const sql = 'UPDATE carts SET cliente_id = ?, total_price = ?, updated_at = ? WHERE id = ?';
      const updatedAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        cartData.cliente_id,
        cartData.total_price,
        updatedAt,
        cart_id
      ]);
      if (result.affectedRows > 0) {
        return { ...cartData, id: cart_id, updated_at: updatedAt };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating cart:", error);
      throw error;
    }
  }

  public static async deleteCart(cart_id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM carts WHERE id = ?';
      const [result]: any = await query(sql, [cart_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting cart:", error);
      throw error;
    }
  }
}
