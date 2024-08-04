import { Router } from 'express';
import { getEmployees, getEmployeeById, createEmployee, updateEmployee, deleteEmployee, loginEmployee } from '../controllers/employeeController';
import { authMiddleware } from '../../shared/middlewares/auth';

const employeeRoutes: Router = Router();

employeeRoutes.post('/login', loginEmployee);

employeeRoutes.get('/', getEmployees);
employeeRoutes.get('/:employeeId', authMiddleware,getEmployeeById);
employeeRoutes.post('/create', createEmployee);
employeeRoutes.put('/edit/:employee_id', updateEmployee);
employeeRoutes.delete('/delete/:employee_id', deleteEmployee);

export default employeeRoutes;