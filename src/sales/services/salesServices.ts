import { SaleRepository } from "../repositories/salesRepository";
import { Sale } from "../models/sales";
import { DateUtils } from "../../shared/utils/DateUtils";

class SaleService {

  public static async createSale(sale: Sale): Promise<Sale> {
    try {
      sale.created_at = DateUtils.formatDate(new Date());
      return await SaleRepository.createSale(sale);
    } catch (error: any) {
      throw new Error(`Error al crear la venta: ${error.message}`);
    }
  }

  public static async getSaleById(saleId: number): Promise<Sale | null> {
    try {
      return await SaleRepository.findById(saleId);
    } catch (error: any) {
      throw new Error(`Error al encontrar la venta: ${error.message}`);
    }
  }
}

export default SaleService;
