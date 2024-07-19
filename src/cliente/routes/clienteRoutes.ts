import { Router } from 'express';
import { createCliente, deleteCliente, loginClient, updateCliente } from '../controllers/clienteController';
import { authMiddleware } from '../../shared/middlewares/auth';

const clienteRoutes: Router = Router();

clienteRoutes.post('/logIn', loginClient);
clienteRoutes.post('/signUp', createCliente);

//No hay get's porque el cliente no tiene porque conocer los otros clientes
//clienteRoutes.get('/', getEmployees);
//clienteRoutes.get('/:employee_id', authMiddleware,);
clienteRoutes.put('/edit/:cliente_id', authMiddleware, updateCliente); // Corregido a cliente_id
clienteRoutes.delete('/delete/:cliente_id', authMiddleware, deleteCliente); // Corregido a cliente_id



export default clienteRoutes;