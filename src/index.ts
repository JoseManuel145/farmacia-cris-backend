import express, { Application } from 'express';
import bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import path from 'path'

// Importar rutas de módulos
import employeeRoutes from './employee/routes/employeeRoutes';
import productRoutes from './product/routes/productRoutes';
import clienteRoutes from './cliente/routes/clienteRoutes';
import cartItemRoutes from './cartItem/routes/cartItemRoutes'; // Importar rutas de cartItem
import cartRoutes from './cart/routes/cartRoutes';// Importar rutas de cart
import saleRoutes from './sales/routes/salesRoutes';
import voucherRoutes from './voucher/routes/voucherRoutes';

// Importar middlewares compartidos
import { errorHandler } from './shared/middlewares/errorHandler';
import { notFoundHandler } from './shared/middlewares/notFoundHandler';


// Configuración de variables de entorno
dotenv.config();

// Crear la aplicación de Express
const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

// Middleware de análisis del cuerpo
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Rutas principales de los módulos
app.use('/api/employee', employeeRoutes);
app.use('/api/product', productRoutes);
app.use('/api/client', clienteRoutes);
app.use('/api/cartItem', cartItemRoutes); // Agregar rutas de cartItem
app.use('/api/cart', cartRoutes); // Agregar rutas de cart
app.use('/api/sale', saleRoutes); // Agregar rutas de sale
app.use('/api/voucher', voucherRoutes); // Agregar rutas de voucher
// Middleware para manejar rutas no encontradas
app.use(notFoundHandler);

// Middleware de manejo de errores
app.use(errorHandler);

// Ruta que usarán para acceder a las imágenes //////ruta de donde se sacarán las imágenes
app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
