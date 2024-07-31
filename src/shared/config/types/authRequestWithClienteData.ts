import { Request } from 'express';
import  { ClientePayload } from './clientpayload';

export interface AuthRequestWithClienteData extends Request {
  clienteData?: ClientePayload;
}
