import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

class productService {

    public static async getAllProducts(): Promise<Product[]> {
        try{
            return await ProductRepository.findAll();
        }catch (error: any){
            throw new Error(`Error al obtener el producto: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try{
            return await ProductRepository.findById(productId);
        }catch (error: any){
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async getProductByName(name: string): Promise<Product | null> {
        try{
            return await ProductRepository.findByName(name);
        }catch (error: any){
            throw new Error(`Error al encontrar producto: ${error.message}`);
        }
    }

    public static async addProduct(product: Product) {
        //const urlProject = process.env.URL;
        //const portProject = process.env.PORT;
      try {
        
        //product.url = `${urlProject}:${portProject}/uploads/${file.filename}`;

          if (!product.created_at) {
              product.created_at = DateUtils.formatDate(new Date());
          }
          return await ProductRepository.createProduct(product);
      } catch (error: any) {
          throw new Error(`Error al crear el producto: ${error.message}`);
      }
  }

  public static async modifyProduct(productId: number, productData: Product): Promise<Product | null> {
    try {
        const productFinded = await ProductRepository.findById(productId);

        if (productFinded) {
            if (productData.stock !== undefined) {
                productFinded.stock = productData.stock;
            }

            if (productData.name !== undefined) {
                productFinded.name = productData.name;
            }

            if (productData.price !== undefined) {
                productFinded.price = productData.price;
            }

            if (productData.description !== undefined) {
                productFinded.description = productData.description;
            }

            if (productData.formula !== undefined) {
                productFinded.formula = productData.formula;
            }

            if (productData.secundary_effects !== undefined) {
                productFinded.secundary_effects = productData.secundary_effects;
            }

            if (productData.caducity !== undefined) {
                productFinded.caducity = productData.caducity;
            }
            if (productData.dose !== undefined) {
                productFinded.dose = productData.dose;
            }
            if (productData.type !== undefined) {
                productFinded.type = productData.type;
            }

            if (productData.updated_by !== undefined) {
                productFinded.updated_by = productData.updated_by;
            }

            productFinded.updated_at = DateUtils.formatDate(new Date());

            // Actualizar el producto en la base de datos
            return await ProductRepository.updateProduct(productId, productFinded);
        } else {
            return null; // Producto no encontrado
        }
    } catch (error: any) {
        throw new Error(`Error al modificar el producto: ${error.message}`);
    }
}

  
  
  
    public static async deleteProduct(productId: number): Promise<boolean> {
        try{
            return await ProductRepository.deleteProduct(productId);
        }catch (error: any){
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}
export default productService