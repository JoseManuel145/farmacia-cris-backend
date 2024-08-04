import { Request, Response } from "express";
import SaleService from "../services/salesServices";

export const createSale = async (req: Request, res: Response) => {
  
  try {
    const { client_id, employee_id, total_price } = req.body;

    if (!client_id || !employee_id || typeof total_price !== 'number') {
      console.log(44);
      return res.status(400).json({ error: "Missing required fields" });
    }
    
    const sale = await SaleService.createSale(req.body);
    res.status(201).json(sale);
  } catch (error: any) {
    console.log(error);
    res.status(500).json({ error: error.message });
  }
};

export const getSaleById = async (req: Request, res: Response) => {
  try {
    const sale = await SaleService.getSaleById(
      parseInt(req.params.sale_id, 10)
    );
    if (sale) {
      res.status(200).json(sale);
    } else {
      res.status(404).json({ message: "Sale not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getAllSales = async (_req: Request, res: Response) => {
  try {
    const sales = await SaleService.getAllSales();
    res.status(200).json(sales);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
