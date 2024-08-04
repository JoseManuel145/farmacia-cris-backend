import { Router } from 'express';
import { createSale, getSaleById, getAllSales } from '../controllers/salesController';
import { authMiddleware } from '../../shared/middlewares/auth';

const saleRoutes: Router = Router();

saleRoutes.post('/', createSale);
saleRoutes.get('/:sale_id', getSaleById);
saleRoutes.get('/', getAllSales);

export default saleRoutes;
