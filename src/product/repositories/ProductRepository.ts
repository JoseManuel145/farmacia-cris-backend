import { Product } from '../models/Product';
import { query } from '../../shared/config/database';
import { DateUtils } from '../../shared/utils/DateUtils';

export class ProductRepository {

  public static async findAll(): Promise<Product[]> {
    try {
      const sql = 'SELECT * FROM products';
      const [results]: any = await query(sql);
      return results as Product[];
    } catch (error) {
      console.error("Error finding all products:", error);
      throw error;
    }
  }

  public static async findById(product_id: number): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM products WHERE id = ?';
      const [results]: any = await query(sql, [product_id]);
      if (results.length > 0) {
        return results[0] as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding product by ID:", error);
      throw error;
    }
  }

  public static async findByName(name: string): Promise<Product | null> {
    try {
      const sql = 'SELECT * FROM products WHERE name = ?';
      const [results]: any = await query(sql, [name]);
      if (results.length > 0) {
        return results[0] as Product;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding product by name:", error);
      throw error;
    }
  }

  public static async createProduct(product: Product): Promise<Product> {
    try {
      const sql = `
        INSERT INTO products (stock, name, price, description, formula, secundary_effects, caducity, dose, type, uso, url, created_at, created_by)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const createdAt = DateUtils.formatDate(new Date());
      const [result]: any = await query(sql, [
        product.stock,
        product.name,
        product.price,
        product.description || '',
        product.formula || '',
        product.secundary_effects || '',
        product.caducity || '',
        product.dose || '',
        product.type || '',
        product.uso || '',
        product.url || '',
        createdAt,
        product.created_by
      ]);
      const createdProductId = result.insertId;
      return { ...product, id: createdProductId, created_at: createdAt };
    } catch (error) {
      console.error("Error creating product:", error);
      throw error;
    }
  }

  public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
    try {
      const sql = `
        UPDATE products SET stock = ?, name = ?, price = ?, description = ?, formula = ?, secundary_effects = ?, caducity = ?, dose = ?, type = ?, uso = ?, url = ?, updated_at = ?, updated_by = ?
        WHERE id = ?
      `;
      const updatedAt = DateUtils.formatDate(new Date());
      const [result]: any = await query(sql, [
        productData.stock,
        productData.name,
        productData.price,
        productData.description,
        productData.formula,
        productData.secundary_effects,
        productData.caducity,
        productData.dose,
        productData.type,
        productData.uso,
        productData.url,
        updatedAt,
        productData.updated_by,
        product_id
      ]);
      if (result.affectedRows > 0) {
        return { ...productData, id: product_id, updated_at: updatedAt };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM products WHERE id = ?';
      const [result]: any = await query(sql, [product_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  }
}
