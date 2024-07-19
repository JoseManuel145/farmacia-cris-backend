import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Product } from '../models/Product';
import { DateUtils } from '../../shared/utils/DateUtils';

export class ProductRepository {

  public static async findAll(): Promise<Product[]> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products', (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          resolve(products);
        }
      });
    });
  }

  public static async findById(product_id: number): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE id = ?', [product_id], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          if (products.length > 0) {
            resolve(products[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async findByName(nombre: string): Promise<Product | null> {
    return new Promise((resolve, reject) => {
      connection.query('SELECT * FROM products WHERE nombre = ?', [nombre], (error: any, results) => {
        if (error) {
          reject(error);
        } else {
          const products: Product[] = results as Product[];
          if (products.length > 0) {
            resolve(products[0]);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async createProduct(product: Product): Promise<Product> {
    const query = 'INSERT INTO products (stock, name, price, created_at, created_by) VALUES (?, ?, ?, ?, ?)';
    return new Promise((resolve, reject) => {
      const createdAt = DateUtils.formatDate(new Date()); 
      connection.execute(query, [
        product.stock, 
        product.name, 
        product.price,
        createdAt, 
        product.created_by
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          const createdProductId = result.insertId;
          const createdProduct: Product = { ...product, id: createdProductId, created_at: createdAt }; // Incluir created_at en el objeto creado
          resolve(createdProduct);
        }
      });
    });
}



  public static async updateProduct(product_id: number, productData: Product): Promise<Product | null> {
    const query = 'UPDATE products SET stock = ?, name = ?, price = ?, description = ?, formula = ?, secundary_effects = ?, caducity = ?, dose = ?, type = ?, uso = ?, updated_at = ?, updated_by = ? WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [
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
        productData.updated_at, 
        productData.updated_by, 
        productData.deleted, 
        product_id
      ], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            const updatedProduct: Product = { ...productData, id: product_id };
            resolve(updatedProduct);
          } else {
            resolve(null);
          }
        }
      });
    });
  }

  public static async deleteProduct(product_id: number): Promise<boolean> {
    const query = 'DELETE FROM products WHERE id = ?';
    return new Promise((resolve, reject) => {
      connection.execute(query, [product_id], (error, result: ResultSetHeader) => {
        if (error) {
          reject(error);
        } else {
          if (result.affectedRows > 0) {
            resolve(true); // Eliminación exitosa
          } else {
            resolve(false); // Si no se encontró el producto a eliminar
          }
        }
      });
    });
  }
}
