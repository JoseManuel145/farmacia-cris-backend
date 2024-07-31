import { Sale } from '../models/sales';
import { query } from '../../shared/config/database';

export class SaleRepository {

  public static async createSale(sale: Sale): Promise<Sale> {
    try {
      const sql = 'INSERT INTO sales (client_id, employee_id, total_price, created_at) VALUES (?, ?, ?, ?)';
      const createdAt = new Date().toISOString();
      const [result]: any = await query(sql, [
        sale.client_id,
        sale.employee_id,
        sale.total_price,
        createdAt
      ]);
      const createdSaleId = result.insertId;
      return { ...sale, id: createdSaleId, created_at: createdAt };
    } catch (error) {
      console.error("Error creating sale:", error);
      throw error;
    }
  }

  public static async findById(sale_id: number): Promise<Sale | null> {
    try {
      const sql = 'SELECT * FROM sales WHERE sale_id = ?';
      const [results]: any = await query(sql, [sale_id]);
      if (results.length > 0) {
        return results[0] as Sale;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding sale by ID:", error);
      throw error;
    }
  }

  public static async findAll(): Promise<Sale[]> {
    try {
      const sql = 'SELECT * FROM sales';
      const [results]: any = await query(sql);
      return results as Sale[];
    } catch (error) {
      console.error("Error finding all sales:", error);
      throw error;
    }
  }
}
