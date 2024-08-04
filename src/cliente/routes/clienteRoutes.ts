import { Router } from "express";
import {
  createCliente,
  deleteCliente,
  loginClient,
  updateCliente,
  getClientes,
} from "../controllers/clienteController";
import { authMiddleware } from "../../shared/middlewares/auth";
import { authClienteMiddleware } from "../../shared/middlewares/authClienteMiddleware";

const clienteRoutes: Router = Router();

clienteRoutes.post("/logIn", loginClient);
clienteRoutes.post("/signUp", createCliente);
clienteRoutes.get("/:id", getClientes);
//!No hay get's porque el cliente no tiene porque conocer los otros clientes
//clienteRoutes.get('/:employee_id', authMiddleware,);
clienteRoutes.put("/edit/:cliente_id", authClienteMiddleware, updateCliente);
clienteRoutes.delete("/delete/:cliente_id", authClienteMiddleware, deleteCliente);

export default clienteRoutes;
