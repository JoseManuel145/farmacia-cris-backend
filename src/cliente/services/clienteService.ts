import { ClienteRepository } from "../repositories/ClienteRepository";
import { Cliente } from "../models/Cliente";
import { DateUtils } from "../../shared/utils/DateUtils";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

const secretKey = process.env.CLIENT_SECRET || "";


const saltRounds = 10;

class clienteService {

    public static async login(email: string, password: string) {
        try {
            const cliente = await this.getClienteByEmail(email);
            if (!cliente) {
                return null;
            }

            const passwordMatch = await bcrypt.compare(password, cliente.password);

            if (!passwordMatch) {
                return null;
            }

            const payload = {
                cliente_id: cliente.cliente_id,
                full_name: cliente.full_name
            }
            return await jwt.sign(payload, secretKey, { expiresIn: '75h' });

        } catch (error: any) {
            throw new Error(`Error al logearse: ${error.message}`);
        }

    }
/*
    public static async getAllClients(): Promise<Cliente[]> {
        try {
            return await ClienteRepository.findAll();
        } catch (error: any) {
            throw new Error(`Error al obtener empleados: ${error.message}`);
        }
    }
*/

    public static async getClientById(clienteId: number): Promise<Cliente | null> {
        try {
            return await ClienteRepository.findById(clienteId);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async getClienteByEmail(email: string): Promise<Cliente | null> {
        try {
            return await ClienteRepository.findByEmail(email);
        } catch (error: any) {
            throw new Error(`Error al encontrar empleado: ${error.message}`);
        }
    }

    public static async addCliente(cliente: Cliente) {
        try {
            const salt = await bcrypt.genSalt(saltRounds);
            cliente.created_at = DateUtils.formatDate(new Date());

            cliente.password = await bcrypt.hash(cliente.password, salt);
            return await ClienteRepository.createCliente(cliente);
        } catch (error: any) {
            throw new Error(`Error al crear empleado: ${error.message}`);
        }
    }

    public static async modifyCliente(clienteId: number, clientData: Cliente) {
        try {
            const clientFinded = await ClienteRepository.findById(clienteId);
            const salt = await bcrypt.genSalt(saltRounds);

            if (clientFinded) {
                if (clientData.full_name) {
                    clientFinded.full_name = clientData.full_name;
                }
                if (clientData.password) {

                    clientFinded.password = await bcrypt.hash(clientData.password, salt);
                }
                if (clientData.deleted) {
                    clientFinded.deleted = clientData.deleted;
                }
            } else {
                return null;
            }
            clientFinded.updated_by = clientData.updated_by
            clientFinded.updated_at = DateUtils.formatDate(new Date());
            return await ClienteRepository.updateCliente(clienteId, clientFinded);
        } catch (error: any) {
            throw new Error(`Error al modificar empleado: ${error.message}`);
        }
    }

    public static async deleteCliente(clienteId: number): Promise<boolean> {
        try {
            return await ClienteRepository.deleteCliente(clienteId);
        } catch (error: any) {
            throw new Error(`Error al eliminar empleado: ${error.message}`);
        }
    }

}
export default clienteService