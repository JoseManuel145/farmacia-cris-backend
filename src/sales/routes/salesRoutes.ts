import { Router } from 'express';
import { createSale,getSaleById } from '../controllers/salesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const saleRoutes: Router = Router();

saleRoutes.post('/', authMiddleware, createSale);
saleRoutes.get('/:sale_id', authMiddleware, getSaleById);

export default saleRoutes;
