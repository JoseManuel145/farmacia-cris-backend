import { Router } from 'express';
import { getCarts, getCartById, createCart, updateCart, deleteCart, updateStatus,updateCartstatus } from '../controllers/cartController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authClienteMiddleware } from '../../shared/middlewares/authClienteMiddleware';
const cartRoutes: Router = Router();

cartRoutes.get('/admin/', authMiddleware, getCarts);
cartRoutes.get('/admin/:cart_id', authMiddleware, getCartById);
cartRoutes.post('/admin/', authMiddleware, createCart);
cartRoutes.put('/admin/:cart_id', authMiddleware, updateCart);
cartRoutes.put('/admin/status/:cart_id', authMiddleware, updateCartstatus);
cartRoutes.delete('/admin/:cart_id', authMiddleware, deleteCart);


cartRoutes.get('/', authClienteMiddleware, getCarts);
cartRoutes.get('/:cart_id', authClienteMiddleware, getCartById);
cartRoutes.post('/', authClienteMiddleware, createCart);
cartRoutes.put('/:cart_id', authClienteMiddleware, updateCart);
cartRoutes.put('/procces/:cart_id', authClienteMiddleware, updateStatus);
cartRoutes.delete('/:cart_id', authClienteMiddleware, deleteCart);


export default cartRoutes;
