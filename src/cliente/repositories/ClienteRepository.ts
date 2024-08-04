import { ResultSetHeader } from 'mysql2';
import connection from '../../shared/config/database';
import { Cliente } from '../models/Cliente';

export class ClienteRepository {
    
    public static async findAll(id:number): Promise<Cliente[]> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM cliente WHERE cliente_id =?',[id], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const clientes: Cliente[] = results as Cliente[];
                    resolve(clientes);
                }
            });
        });
    }
        
    public static async findById(cliente_id: number): Promise<Cliente | null> {
        return new Promise((resolve, reject) => {
          connection.query('SELECT * FROM cliente WHERE cliente_id = ?', [cliente_id], (error, results) => {
            if (error) {
              reject(error);
            } else {
              const clientes: Cliente[] = results as Cliente[];
              if (clientes.length > 0) {
                resolve(clientes[0]);
              } else {
                resolve(null);
              }
            }
          });
        });
      }
    public static async findByEmail(email: string): Promise<Cliente | null> {
        return new Promise((resolve, reject) => {
            connection.query('SELECT * FROM cliente WHERE email = ?', [email], (error: any, results) => {
                if (error) {
                    reject(error);
                } else {
                    const clientes: Cliente[] = results as Cliente[];
                    if (clientes.length > 0) {
                        resolve(clientes[0]);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async createCliente(cliente: Cliente): Promise<Cliente> {
        const query = 'INSERT INTO cliente (email, full_name, password, created_by) VALUES (?, ?, ?, ?)';
        return new Promise((resolve, reject) => {
            connection.execute(query, [
                cliente.email,
                cliente.full_name,
                cliente.password,
                cliente.created_by
            ], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    const createdClienteId = result.insertId;
                    const createdCliente: Cliente = { ...cliente, cliente_id: createdClienteId };
                    resolve(createdCliente);
                }
            });
        });
    }
    public static async updateCliente(cliente_id: number, clientData: Cliente): Promise<Cliente | null> {
        const query = 'UPDATE cliente SET full_name = ?, password = ?,email=?, updated_at = ?, updated_by = ? WHERE cliente_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [
                clientData.full_name,
                clientData.password,
                clientData.email,
                clientData.updated_at,
                clientData.updated_by,
                cliente_id
            ], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        const updatedCliente: Cliente = { ...clientData, cliente_id: cliente_id };
                        resolve(updatedCliente);
                    } else {
                        resolve(null);
                    }
                }
            });
        });
    }
    public static async deleteCliente(cliente_id: number): Promise<boolean> {
        const query = 'DELETE FROM cliente WHERE cliente_id = ?';
        return new Promise((resolve, reject) => {
            connection.execute(query, [cliente_id], (error, result: ResultSetHeader) => {
                if (error) {
                    reject(error);
                } else {
                    if (result.affectedRows > 0) {
                        resolve(true); // Eliminación exitosa
                    } else {
                        resolve(false); // Si no se encontró el usuario a eliminar
                    }
                }
            });
        });
    }
}
