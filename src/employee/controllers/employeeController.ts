import { Request, Response } from "express";
import { employeeService } from "../services/employeeService";
export const loginEmployee = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await employeeService.login(email, password);

    if (!token) {
      res.status(401).json({ message: "Invalid full name or password" });
    } else {
      res.status(200).json({ token: token.token, rol: token.rol });
    }
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getEmployees = async (_req: Request, res: Response) => {
  try {
    const employees = await employeeService.getAllEmployees();
    if (employees.length > 0) {
      res.status(200).json(employees);
    } else {
      res.status(404).json({ message: "No records found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const getEmployeeById = async (req: Request, res: Response) => {
  try {
    const employee = await employeeService.getEmployeeById(
      parseInt(req.params.employeeId, 10)
    );
    if (employee) {
      res.status(200).json(employee);
    } else {
      res.status(404).json({ message: "Employee not found" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const createEmployee = async (req: Request, res: Response) => {
  try {
    const { full_name, password, created_by, email } = req.body;

    if (!full_name || !password || !created_by || !email) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newEmployee = await employeeService.addEmployee(req.body);
    res.status(201).json(newEmployee);
  } catch (error: any) {
    console.log(error);

    res.status(500).json({ error: error.message });
  }
};

export const updateEmployee = async (req: Request, res: Response) => {
  console.log(req.body);

  try {
    const updatedEmployee = await employeeService.modifyEmployee(
      parseInt(req.params.employee_id, 10),
      req.body
    );
    if (updatedEmployee) {
      res.status(200).json(updatedEmployee);
    } else {
      res.status(404).json({ message: "Employee not found or update failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};

export const deleteEmployee = async (req: Request, res: Response) => {
  try {
    const deleted = await employeeService.deleteEmployee(
      parseInt(req.params.employee_id, 10)
    );
    if (deleted) {
      res.status(200).json({ message: "Employee deleted successfully" });
    } else {
      res.status(404).json({ message: "Employee not found or delete failed" });
    }
  } catch (error: any) {
    res.status(500).json({ error: error.message });
  }
};
