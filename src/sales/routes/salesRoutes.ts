import { Router } from 'express';
import { createSale, getSaleById, getAllSales } from '../controllers/salesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const saleRoutes: Router = Router();

saleRoutes.post('/', authMiddleware, createSale);
saleRoutes.get('/:sale_id', authMiddleware, getSaleById);
saleRoutes.get('/', authMiddleware, getAllSales);

export default saleRoutes;
