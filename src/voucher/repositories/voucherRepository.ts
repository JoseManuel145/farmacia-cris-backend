import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Voucher } from '../models/voucher';

export class VoucherRepository {

  public static async createVoucher(voucher: Voucher): Promise<Voucher> {
    const query = 'INSERT INTO vouchers (sale_id, id_cart, quantity, status, created_at) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      connection.execute(query, [
        voucher.sale_id,
        voucher.product_id,
        voucher.quantity,
        voucher.status,
        createdAt
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdVoucherId = result.insertId;
          const createdVoucher: Voucher = { ...voucher, id: createdVoucherId, created_at: createdAt };
          resolve(createdVoucher);
        }
      });
    });
  }
  public static async findAll(): Promise<Voucher[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM vouchers', (error, results) => {
        if (error) {
          reject(error);
        } else {
          const vouchers: Voucher[] = results as Voucher[];
          resolve(vouchers);
        }
      });
    });
  }

  public static async updateVoucherStatus(voucher_id: number, status: string): Promise<Voucher | null> {
    const query = 'UPDATE vouchers SET status = ?, updated_at = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      const updatedAt = new Date().toISOString();
      connection.execute(query, [
        status,
        updatedAt,
        voucher_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedVoucher: Voucher = { 
              id: voucher_id, 
              status: status, 
              updated_at: updatedAt,
              sale_id: 0, // Replace 0 with the appropriate value
              product_id: 0, // Replace 0 with the appropriate value
              quantity: 0, // Replace 0 with the appropriate value
              created_at: '' // Replace '' with the appropriate value
            };
            resolve(updatedVoucher);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findById(voucher_id: number): Promise<[] | null> {
    return new Promise((resolve, reject) => {
      connection.query(`SELECT c.id AS id_cart, v.id AS voucher_id,p.url, p.name AS product_name, ci.quantity, ci.price, c.total_price
      FROM vouchers v JOIN carts c ON v.id_cart = c.id
      JOIN cart_items ci ON c.id = ci.cart_id JOIN
      products p ON ci.product_id = p.id
      WHERE v.status = 'pending' and v.id =? and c.status =? and ci.cart_id =v.id_cart and ci.deleted = 0`,
       [voucher_id,"En proceso"], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const vouchers: [] = results as [];
          if (vouchers.length > 0) {
            resolve(vouchers);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}
