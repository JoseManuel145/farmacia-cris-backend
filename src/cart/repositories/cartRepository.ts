import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Cart } from '../models/cart';

export class CartRepository {

  public static async findAll(): Promise<Cart[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM carts', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const carts: Cart[] = results as Cart[];
          resolve(carts);
        }
      });
    });
  }

  public static async findById(cart_id: number): Promise<Cart | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM carts WHERE id = ?', [cart_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const carts: Cart[] = results as Cart[];
          if (carts.length > 0) {
            resolve(carts[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createCart(cart: Cart): Promise<Cart> {
    const query = 'INSERT INTO carts (cliente_id, total_price, created_at) VALUES (?, ?, ?)';
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      connection.execute(query, [
        cart.cliente_id,
        cart.total_price,
        createdAt
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdCartId = result.insertId;
          const createdCart: Cart = { ...cart, id: createdCartId, created_at: createdAt };
          resolve(createdCart);
        }
      });
    });
  }

  public static async updateCart(cart_id: number, cartData: Cart): Promise<Cart | null> {
    const query = 'UPDATE carts SET cliente_id = ?, total_price = ?, updated_at = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      connection.execute(query, [
        cartData.cliente_id,
        cartData.total_price,
        updatedAt,
        cart_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedCart: Cart = { ...cartData, id: cart_id, updated_at: updatedAt };
            resolve(updatedCart);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteCart(cart_id: number): Promise<boolean> {
    const query = 'DELETE FROM carts WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [cart_id], (error, result: ResultSetHeader) => {
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
