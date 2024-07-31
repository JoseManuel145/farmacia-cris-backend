import { Cliente } from '../models/Cliente';
import { query } from '../../shared/config/database';

export class ClienteRepository {
  
  public static async findById(cliente_id: number): Promise<Cliente | null> {
    try {
      const sql = 'SELECT * FROM cliente WHERE cliente_id = ?';
      const results: any = await query(sql, [cliente_id]);
      if (results.length > 0) {
        return results[0] as Cliente;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding cliente by ID:", error);
      throw error;
    }
  }

  public static async findByEmail(email: string): Promise<Cliente | null> {
    try {
      const sql = 'SELECT * FROM cliente WHERE email = ?';
      const results: any = await query(sql, [email]);
      if (results.length > 0) {
        return results[0] as Cliente;
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error finding cliente by email:", error);
      throw error;
    }
  }

  public static async createCliente(cliente: Cliente): Promise<Cliente> {
    try {
        console.log(cliente.email,
            cliente.full_name,
            cliente.password,
            cliente.created_by)
      const sql = 'INSERT INTO cliente (email, full_name, password, created_by) VALUES (?, ?, ?, ?)';
      const result: any = await query(sql, [
        cliente.email,
        cliente.full_name,
        cliente.password,
        cliente.created_by
      ]);
      const createdClienteId = result.insertId;
      return { ...cliente, cliente_id: createdClienteId };
    } catch (error) {
      console.error("Error creating cliente:", error);
      throw error;
    }
  }

  public static async updateCliente(cliente_id: number, clientData: Cliente): Promise<Cliente | null> {
    try {
      const sql = 'UPDATE cliente SET full_name = ?, password = ?, updated_at = ?, updated_by = ? WHERE cliente_id = ?';
      const [result]: any = await query(sql, [
        clientData.full_name,
        clientData.password,
        clientData.updated_at,
        clientData.updated_by,
        cliente_id
      ]);
      if (result.affectedRows > 0) {
        return { ...clientData, cliente_id: cliente_id };
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error updating cliente:", error);
      throw error;
    }
  }

  public static async deleteCliente(cliente_id: number): Promise<boolean> {
    try {
      const sql = 'DELETE FROM cliente WHERE cliente_id = ?';
      const result: any = await query(sql, [cliente_id]);
      return result.affectedRows > 0;
    } catch (error) {
      console.error("Error deleting cliente:", error);
      throw error;
    }
  }
}
