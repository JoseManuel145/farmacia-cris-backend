import { Voucher } from '../models/voucher';
import { query } from '../../shared/config/database';

export class VoucherRepository {

  public static async createVoucher(voucher: Voucher): Promise<Voucher> {
    try {
      const sql = 'INSERT INTO vouchers (sale_id, product_id, quantity, status, created_at) VALUES (?, ?, ?, ?, ?)';
      const createdAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        voucher.sale_id,
        voucher.product_id,
        voucher.quantity,
        voucher.status,
        createdAt
      ]);
      const createdVoucherId = result.insertId;
      return { ...voucher, id: createdVoucherId, created_at: createdAt };
    } catch (error) {
      console.error("Error creating voucher:", error);
      throw error;
    }
  }

  public static async findAll(): Promise<Voucher[]> {
    try {
      const sql = 'SELECT * FROM vouchers';
      const [results]: any = await query(sql);
      return results as Voucher[];
    } catch (error) {
      console.error("Error finding all vouchers:", error);
      throw error;
    }
  }

  public static async updateVoucherStatus(voucher_id: number, status: string): Promise<Voucher | null> {
    try {
      const sql = 'UPDATE vouchers SET status = ?, updated_at = ? WHERE id = ?';
      const updatedAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        status,
        updatedAt,
        voucher_id
      ]);
      if (result.affectedRows > 0) {
        // Complete with actual values if needed
        return { 
          id: voucher_id, 
          status: status, 
          updated_at: updatedAt,
          sale_id: 0,
          product_id: 0,
          quantity: 0,
          created_at: ''
        };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating voucher status:", error);
      throw error;
    }
  }

  public static async findById(voucher_id: number): Promise<Voucher | null> {
    try {
      const sql = 'SELECT * FROM vouchers WHERE id = ?';
      const [results]: any = await query(sql, [voucher_id]);
      if (results.length > 0) {
        return results[0] as Voucher;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding voucher by ID:", error);
      throw error;
    }
  }
}
