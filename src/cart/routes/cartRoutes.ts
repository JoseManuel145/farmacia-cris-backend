import { Router } from 'express';
import { getCarts, getCartById, createCart, updateCart, deleteCart } from '../controllers/cartController';
import { authMiddleware } from '../../shared/middlewares/auth';

const cartRoutes: Router = Router();

cartRoutes.get('/', authMiddleware, getCarts);
cartRoutes.get('/:cart_id', authMiddleware, getCartById);
cartRoutes.post('/', authMiddleware, createCart);
cartRoutes.put('/:cart_id', authMiddleware, updateCart);
cartRoutes.delete('/:cart_id', authMiddleware, deleteCart);

export default cartRoutes;
