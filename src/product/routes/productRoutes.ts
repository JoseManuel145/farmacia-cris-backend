import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authClienteMiddleware } from '../../shared/middlewares/authClienteMiddleware';
import { authMiddleware } from '../../shared/middlewares/auth';

const productRoutes: Router = Router();

productRoutes.get('/admin/', authMiddleware, getProducts);
productRoutes.get('/admin/:product_id', authMiddleware, getProductById);
productRoutes.get('/', authClienteMiddleware, getProducts);
productRoutes.get('/:product_id', authClienteMiddleware, getProductById);
productRoutes.post('/', authMiddleware, createProduct);
productRoutes.put('/:product_id', authMiddleware, updateProduct);
productRoutes.delete('/:product_id', authMiddleware, deleteProduct);

export default productRoutes;
