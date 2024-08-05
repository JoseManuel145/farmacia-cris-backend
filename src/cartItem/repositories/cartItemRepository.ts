import { ResultSetHeader } from "mysql2";
import connection from "../../shared/config/database";
import { CartItem } from "../models/cartItem";

export class CartItemRepository {
  public static async findAll(): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
      connection.query("SELECT * FROM cart_items", (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const cartItems: CartItem[] = results as CartItem[];
          resolve(cartItems);
        }
      });
    });
  }
  public static async getCarH(id: number): Promise<[]> {
    console.log(id);
    
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT c.id AS cart_id, p.name, p.price, p.url, t.quantity, t.price AS cart_price
FROM cart_items t 
JOIN products p ON t.product_id = p.id 
JOIN carts c ON t.cart_id = c.id
WHERE c.cliente_id = ? AND t.deleted = ? AND c.status != ?;
`,
        [id,0, "Pendiente"],
        (error, results) => {
          if (error) {
            reject(error);
          } else {
            const cartItems = results as [];
            resolve(cartItems);
          }
        }
      );
    });
  }
  
  public static async getImgs(): Promise<CartItem[]> {
    return new Promise((resolve, reject) => {
      connection.query(
        `WITH RankedProducts AS (
    SELECT *, ROW_NUMBER() OVER (PARTITION BY product_id ORDER BY quantity DESC) AS rn
    FROM cart_items )
       SELECT ci.product_id, ci.quantity, p.url, p.name FROM RankedProducts ci
       JOIN products p ON ci.product_id = p.id WHERE ci.rn = 1 AND p.deleted=0`,
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const cartItems: CartItem[] = results as CartItem[];
            resolve(cartItems);
          }
        }
      );
    });
  }

  public static async findById(
    cart_item_id: number
  ): Promise<CartItem[] | null> {
    return new Promise((resolve, reject) => {
      connection.query(
        `SELECT p.name, p.price, p.url, t.quantity, t.price, t.id
        FROM cart_items t JOIN products p ON t.product_id = p.id
        WHERE t.cart_id =? AND t.deleted = 0`,
        [cart_item_id],
        (error: any, results) => {
          if (error) {
            reject(error);
          } else {
            const cartItems: CartItem[] = results as CartItem[];
            if (cartItems.length > 0) {
              resolve(cartItems);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  public static async createCartItem(cartItem: CartItem): Promise<CartItem> {
    const query =
      "INSERT INTO cart_items (product_id, quantity, price, cart_id, created_at) VALUES (?, ?, ?, ?, ?)";
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      connection.execute(
        query,
        [
          cartItem.product_id,
          cartItem.quantity,
          cartItem.price,
          cartItem.cart_id,
          createdAt,
        ],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            const createdCartItemId = result.insertId;
            const createdCartItem: CartItem = {
              ...cartItem,
              id: createdCartItemId,
              created_at: createdAt,
            };
            resolve(createdCartItem);
          }
        }
      );
    });
  }

  public static async updateCartItem(
    cart_item_id: number,
    cartItemData: CartItem
  ): Promise<CartItem | null> {
    const query =
      "UPDATE cart_items SET product_id = ?, quantity = ?, price = ?, cart_id = ?, updated_at = ? WHERE id = ?";
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      connection.execute(
        query,
        [
          cartItemData.product_id,
          cartItemData.quantity,
          cartItemData.price,
          cartItemData.cart_id,
          updatedAt,
          cart_item_id,
        ],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            if (result.affectedRows > 0) {
              const updatedCartItem: CartItem = {
                ...cartItemData,
                id: cart_item_id,
                updated_at: updatedAt,
              };
              resolve(updatedCartItem);
            } else {
              resolve(null);
            }
          }
        }
      );
    });
  }

  public static async deleteCartItem(cart_item_id: number): Promise<boolean> {
    const query = "UPDATE cart_items SET deleted=1 WHERE id = ?";
    return new Promise((resolve, reject) => {
      connection.execute(
        query,
        [cart_item_id],
        (error, result: ResultSetHeader) => {
          if (error) {
            reject(error);
          } else {
            if (result.affectedRows > 0) {
              resolve(true);
            } else {
              resolve(false);
            }
          }
        }
      );
    });
  }
}
