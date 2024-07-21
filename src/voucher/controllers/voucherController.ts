import { Request, Response } from 'express';
import VoucherService from '../services/voucherServices';

export const createVoucher = async (req: Request, res: Response) => {
  try {
    const voucher = await VoucherService.createVoucher(req.body);
    res.status(201).json(voucher);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateVoucherStatus = async (req: Request, res: Response) => {
  try {
    const voucher = await VoucherService.updateVoucherStatus(parseInt(req.params.voucher_id, 10), req.body.status);
    if (voucher) {
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: 'Voucher not found or update failed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getVoucherById = async (req: Request, res: Response) => {
  try {
    const voucher = await VoucherService.getVoucherById(parseInt(req.params.voucher_id, 10));
    if (voucher) {
      res.status(200).json(voucher);
    } else {
      res.status(404).json({ message: 'Voucher not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
