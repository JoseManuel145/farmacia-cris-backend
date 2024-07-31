import { Router } from 'express';
import { createVoucher, updateVoucherStatus, getVoucherById, getAllVouchers } from '../controllers/voucherController';
import { authMiddleware } from '../../shared/middlewares/auth';
import { authClienteMiddleware } from '../../shared/middlewares/authClienteMiddleware';

const voucherRoutes: Router = Router();

voucherRoutes.post('/', authClienteMiddleware, createVoucher);
voucherRoutes.put('/:voucher_id', authClienteMiddleware, updateVoucherStatus);
voucherRoutes.get('/:voucher_id', authClienteMiddleware, getVoucherById);
voucherRoutes.get('/', authClienteMiddleware, getAllVouchers); // Nueva ruta para obtener todos los vouchers

voucherRoutes.post('/admin/', authMiddleware, createVoucher);
voucherRoutes.put('/admin/:voucher_id', authMiddleware, updateVoucherStatus);
voucherRoutes.get('/admin/:voucher_id', authMiddleware, getVoucherById);
voucherRoutes.get('/admin/', authMiddleware, getAllVouchers)

export default voucherRoutes;
