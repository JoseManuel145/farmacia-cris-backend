import { VoucherRepository } from "../repositories/voucherRepository";
import { Voucher } from "../models/voucher";
import { DateUtils } from "../../shared/utils/DateUtils";

class VoucherService {

  public static async createVoucher(voucher: Voucher): Promise<Voucher> {
    try {
      voucher.created_at = DateUtils.formatDate(new Date());
      voucher.status = voucher.status || "pending";
      return await VoucherRepository.createVoucher(voucher);
    } catch (error: any) {
      throw new Error(`Error al crear el voucher: ${error.message}`);
    }
  }

  public static async getAllVouchers(): Promise<Voucher[]> {
    try {
      return await VoucherRepository.findAll();
    } catch (error: any) {
      throw new Error(`Error al obtener los vouchers: ${error.message}`);
    }
  }


  public static async updateVoucherStatus(voucherId: number, status: string): Promise<Voucher | null> {
    try {
      return await VoucherRepository.updateVoucherStatus(voucherId, status);
    } catch (error: any) {
      throw new Error(`Error al actualizar el estado del voucher: ${error.message}`);
    }
  }

  public static async getVoucherById(voucherId: number): Promise<[] | null> {
    try {
      return await VoucherRepository.findById(voucherId);
    } catch (error: any) {
      throw new Error(`Error al encontrar el voucher: ${error.message}`);
    }
  }
}

export default VoucherService;
