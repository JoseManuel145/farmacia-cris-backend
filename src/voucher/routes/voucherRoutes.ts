import { Router } from 'express';
import { createVoucher, updateVoucherStatus, getVoucherById, getAllVouchers } from '../controllers/voucherController';
import { authMiddleware } from '../../shared/middlewares/auth';

const voucherRoutes: Router = Router();

voucherRoutes.post('/', authMiddleware, createVoucher);
voucherRoutes.put('/:voucher_id', authMiddleware, updateVoucherStatus);
voucherRoutes.get('/:voucher_id', authMiddleware, getVoucherById);
voucherRoutes.get('/', authMiddleware, getAllVouchers); // Nueva ruta para obtener todos los vouchers

export default voucherRoutes;
