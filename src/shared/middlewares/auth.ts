import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { EmployeeRepository } from '../../employee/repositories/EmployeeRepository';
import { ClienteRepository } from '../../cliente/repositories/ClienteRepository';
import { AuthRequest } from '../config/types/authRequest';

dotenv.config();

const secretKey = process.env.SECRET || "";

export const authMiddleware = async (req: AuthRequest, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as any;

    // Check if the token is for an employee
    if (payload.employee_id) {
      const employee = await EmployeeRepository.findById(payload.employee_id);
      if (!employee) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.employeeData = payload;
    } 
    // Check if the token is for a client
    else if (payload.cliente_id) {
      const cliente = await ClienteRepository.findById(payload.cliente_id);
      if (!cliente) {
        return res.status(401).json({ message: 'Invalid token' });
      }
      req.clienteData = payload;
    } 
    // If the token is neither for an employee nor a client
    else {
      return res.status(401).json({ message: 'Invalid token' });
    }

    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
