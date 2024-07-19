import { Request, Response } from 'express';
import clienteService from '../services/clienteService';

export const loginClient = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await clienteService.login(email, password);

    if (!token) {
      res.status(401).json({ message: 'Invalid full name or password' });
    } else {
      res.status(200).json({ token });
    }
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
};
/*
export const getClientes = async (_req: Request, res: Response) => {
  try {
    const clientes = await clienteService.getAllClients();
    if (clientes.length > 0) {
      res.status(200).json(clientes);
    } else {
      res.status(404).json({ message: 'No records found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getClientById = async (req: Request, res: Response) => {
  try {
    const employee = await clienteService.getClientById(parseInt(req.params.cliente_id, 10));
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
*/
export const createCliente = async (req: Request, res: Response) => {
  try {
    const { email, full_name, password, created_by } = req.body;

    if (!email || !full_name || !password || !created_by ) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const newCliente = await clienteService.addCliente(req.body);
    res.status(201).json(newCliente);
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const updateCliente = async (req: Request, res: Response) => {
  try {
    const updatedCliente = await clienteService.modifyCliente(parseInt(req.params.cliente_id, 10), req.body);
    if (updatedCliente) {
      res.status(200).json(updatedCliente);
    } else {
      res.status(404).json({ message: 'User not found or update failed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteCliente = async (req: Request, res: Response) => {
  try {
    const deleted = await clienteService.deleteCliente(parseInt(req.params.cliente_id, 10));
    if (deleted) {
      res.status(200).json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found or delete failed' });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
