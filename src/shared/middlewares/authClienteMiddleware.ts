import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import { ClienteRepository } from '../../cliente/repositories/ClienteRepository';
import { ClientePayload } from '../config/types/clientpayload';
import { AuthRequestWithClienteData } from '../config/types/authRequestWithClienteData';

dotenv.config();

const secretKey = process.env.CLIENT_SECRET || "";


export const authClienteMiddleware = async (req: AuthRequestWithClienteData, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.replace('Bearer ', '');

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const payload = jwt.verify(token, secretKey) as ClientePayload;
    const cliente = await ClienteRepository.findById(payload.cliente_id);

    if (!cliente) {
      return res.status(401).json({ message: 'Invalid token' });
    }

    req.clienteData = payload;
    next();
  } catch (error: any) {
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired' });
    }
    return res.status(401).json({ message: 'Unauthorized' });
  }
};
