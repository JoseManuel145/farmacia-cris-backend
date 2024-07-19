import { Router } from 'express';
import { getCartItems, getCartItemById, createCartItem, updateCartItem, deleteCartItem } from '../controllers/cartItemController';
import { authMiddleware } from '../../shared/middlewares/auth';

const cartItemRoutes: Router = Router();

cartItemRoutes.get('/', authMiddleware, getCartItems);
cartItemRoutes.get('/:cart_item_id', authMiddleware, getCartItemById);
cartItemRoutes.post('/', authMiddleware, createCartItem);
cartItemRoutes.put('/:cart_item_id', authMiddleware, updateCartItem);
cartItemRoutes.delete('/:cart_item_id', authMiddleware, deleteCartItem);

export default cartItemRoutes;
