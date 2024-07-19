import { Request } from "express";
import { EmployeePayload } from "./employePayLoad";

export interface AuthRequest extends Request {
    clienteData: any;
    employeeData?: EmployeePayload;
}