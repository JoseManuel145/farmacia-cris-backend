import { Request, Response } from 'express';
import VoucherService from '../services/voucherServices';

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const { sale_id, product_id, quantity } = req.body;

    // Validación de campos requeridos
    if (!sale_id || !product_id || quantity === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const voucher = await VoucherService.createVoucher(req.body);
    res.status(201).json(voucher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar el estado de un voucher
export const updateVoucherStatus = async (req: Request, res: Response) => {
  try {
    const { voucher_id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ error: 'Missing status field' });
    }

    const voucher = await VoucherService.updateVoucherStatus(parseInt(voucher_id, 10), status);
    if (voucher) {
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: 'Voucher not found or update failed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
export const getAllVouchers = async (_req: Request, res: Response) => {
  try {
    const vouchers = await VoucherService.getAllVouchers();
    res.status(200).json(vouchers);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
// Controlador para obtener un voucher por su ID
export const getVoucherById = async (req: Request, res: Response) => {
  try {
    const voucher_id = parseInt(req.params.voucher_id, 10);
    const voucher = await VoucherService.getVoucherById(voucher_id);
    if (voucher) {
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: 'Voucher not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

