import { Employee } from '../models/Employee';
import { query } from '../../shared/config/database';

export class EmployeeRepository {

  public static async findAll(): Promise<Employee[]> {
    try {
      const sql = 'SELECT employee_id, full_name FROM employee';
      const [results]: any = await query(sql);
      return results as Employee[];
    } catch (error) {
      console.error("Error fetching employees:", error);
      throw error;
    }
  }

  public static async findById(employee_id: number): Promise<Employee | null> {
    try {
      const sql = 'SELECT * FROM employee WHERE employee_id = ?';
      const [results]: any = await query(sql, [employee_id]);
      if (results.length > 0) {
        return results[0] as Employee;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding employee by ID:", error);
      throw error;
    }
  }

  public static async findByFullName(fullName: string): Promise<Employee | null> {
    try {
      const sql = 'SELECT * FROM employee WHERE full_name = ?';
      const results: any = await query(sql, [fullName]);
      if (results.length > 0) {
        return results[0] as Employee;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding employee by full name:", error);
      throw error;
    }
  }

  public static async createEmployee(employee: Employee): Promise<Employee> {
    try {
      const sql = 'INSERT INTO employee (full_name, password, salary, position, created_by) VALUES (?, ?, ?, ?, ?)';
      const result: any = await query(sql, [
        employee.full_name, 
        employee.password, 
        employee.salary,
        employee.position,
        employee.created_by
      ]);
      const createdEmployeeId = result.insertId;
      return { ...employee, employee_id: createdEmployeeId };
    } catch (error) {
      console.error("Error creating employee:", error);
      throw error;
    }
  }

  public static async updateEmployee(employee_id: number, employeeData: Employee): Promise<Employee | null> {
    try {
      const sql = 'UPDATE employee SET full_name = ?, password = ?, salary = ?, position = ?, updated_at = ?, updated_by = ?, deleted = ? WHERE employee_id = ?';
      const [result]: any = await query(sql, [
        employeeData.full_name ?? null,
        employeeData.password ?? null,
        employeeData.salary ?? null,
        employeeData.position ?? null,
        employeeData.updated_at ?? null,
        employeeData.updated_by ?? null,
        employeeData.deleted ?? null,
        employee_id
      ]);
      if (result.affectedRows > 0) {
        return { ...employeeData, employee_id };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating employee:", error);
      throw error;
    }
  }

  public static async deleteEmployee(employee_id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM employee WHERE employee_id = ?';
      const [result]: any = await query(sql, [employee_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting employee:", error);
      throw error;
    }
  }
}
