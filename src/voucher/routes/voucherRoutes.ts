import { Router } from 'express';
import { createVoucher, updateVoucherStatus, getVoucherById, getAllVouchers } from '../controllers/voucherController';
import { authMiddleware } from '../../shared/middlewares/auth';

const voucherRoutes: Router = Router();

voucherRoutes.post('/', createVoucher);
voucherRoutes.put('/:voucher_id', updateVoucherStatus);
voucherRoutes.get('/:voucher_id', getVoucherById);
voucherRoutes.get('/', getAllVouchers); // Nueva ruta para obtener todos los vouchers

export default voucherRoutes;
