import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { CartItem } from '../models/cartItem';

export class CartItemRepository {

  public static async findAll(): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cart_items', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const cartItems: CartItem[] = results as CartItem[];
          resolve(cartItems);
        }
      });
    });
  }

  public static async findById(cart_item_id: number): Promise<CartItem | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM cart_items WHERE id = ?', [cart_item_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const cartItems: CartItem[] = results as CartItem[];
          if (cartItems.length > 0) {
            resolve(cartItems[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createCartItem(cartItem: CartItem): Promise<CartItem> {
    const query = 'INSERT INTO cart_items (product_id, quantity, price, cart_id, created_at) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      connection.execute(query, [
        cartItem.product_id,
        cartItem.quantity,
        cartItem.price,
        cartItem.cart_id,
        createdAt
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdCartItemId = result.insertId;
          const createdCartItem: CartItem = { ...cartItem, id: createdCartItemId, created_at: createdAt };
          resolve(createdCartItem);
        }
      });
    });
  }

  public static async updateCartItem(cart_item_id: number, cartItemData: CartItem): Promise<CartItem | null> {
    const query = 'UPDATE cart_items SET product_id = ?, quantity = ?, price = ?, cart_id = ?, updated_at = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      connection.execute(query, [
        cartItemData.product_id,
        cartItemData.quantity,
        cartItemData.price,
        cartItemData.cart_id,
        updatedAt,
        cart_item_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedCartItem: CartItem = { ...cartItemData, id: cart_item_id, updated_at: updatedAt };
            resolve(updatedCartItem);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteCartItem(cart_item_id: number): Promise<boolean> {
    const query = 'DELETE FROM cart_items WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [cart_item_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true);
          } else {
            resolve(false);
          }
        }
      });
    });
  }
}
