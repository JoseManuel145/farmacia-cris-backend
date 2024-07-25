import { ProductRepository } from "../repositories/ProductRepository";
import { Product } from "../models/Product";
import { DateUtils } from "../../shared/utils/DateUtils";
import dotenv from 'dotenv';

dotenv.config();

class ProductService {

    public static async getAllProducts(): Promise<Product[]> {
        try {
            return await ProductRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener los productos: ${error.message}`);
        }
    }

    public static async getProductById(productId: number): Promise<Product | null> {
        try {
            return await ProductRepository.findById(productId);
        } catch (error: any) {
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async getProductByName(name: string): Promise<Product | null> {
        try {
            return await ProductRepository.findByName(name);
        } catch (error: any) {
            throw new Error(`Error al encontrar el producto: ${error.message}`);
        }
    }

    public static async addProduct(product: Product) {
        try {
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
                Object.assign(productFinded, productData);
                productFinded.updated_at = DateUtils.formatDate(new Date());
                return await ProductRepository.updateProduct(productId, productFinded);
            } else {
                return null;
            }
        } catch (error: any) {
            throw new Error(`Error al modificar el producto: ${error.message}`);
        }
    }

    public static async deleteProduct(productId: number): Promise<boolean> {
        try {
            return await ProductRepository.deleteProduct(productId);
        } catch (error: any) {
            throw new Error(`Error al eliminar el producto: ${error.message}`);
        }
    }
}

export default ProductService;
