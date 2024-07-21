import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Sale } from '../models/sales';

export class SaleRepository {

  public static async createSale(sale: Sale): Promise<Sale> {
    const query = 'INSERT INTO sales (client_id, employee_id, total_price, created_at) VALUES (?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      const createdAt = new Date().toISOString();
      connection.execute(query, [
        sale.client_id,
        sale.employee_id,
        sale.total_price,
        createdAt
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdSaleId = result.insertId;
          const createdSale: Sale = { ...sale, id: createdSaleId, created_at: createdAt };
          resolve(createdSale);
        }
      });
    });
  }

  public static async findById(sale_id: number): Promise<Sale | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM sales WHERE id = ?', [sale_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const sales: Sale[] = results as Sale[];
          if (sales.length > 0) {
            resolve(sales[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }
}
