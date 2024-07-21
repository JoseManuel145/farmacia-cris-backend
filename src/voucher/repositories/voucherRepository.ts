import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Voucher } from '../models/voucher';

export class VoucherRepository {

  public static async createVoucher(voucher: Voucher): Promise<Voucher> {
    const query = 'INSERT INTO vouchers (sale_id, product_id, quantity, status, created_at) VALUES (?, ?, ?, ?, ?)';
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

  public static async findById(voucher_id: number): Promise<Voucher | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM vouchers WHERE id = ?', [voucher_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const vouchers: Voucher[] = results as Voucher[];
          if (vouchers.length > 0) {
            resolve(vouchers[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}
