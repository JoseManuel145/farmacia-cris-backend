import { Router } from 'express';
import { getProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController';
import { authMiddleware} from '../../shared/middlewares/auth';
//import upload from '../../shared/middlewares/uploadMiddleware';

const productRoutes: Router = Router();

productRoutes.get('/', authMiddleware, getProducts);
productRoutes.get('/:product_id', authMiddleware,getProductById);
productRoutes.post('/',authMiddleware, createProduct);
productRoutes.put('/:product_id',authMiddleware, updateProduct);
productRoutes.delete('/:product_id',authMiddleware, deleteProduct);
//productRoutes.post('/', upload.single('productImage'), createProduct);

export default productRoutes;