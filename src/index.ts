import express, { Application } from "express";
import bodyParser from "body-parser";
import * as dotenv from "dotenv";
import path from "path";
import cors from "cors";
import employeeRoutes from "./employee/routes/employeeRoutes";
import productRoutes from "./product/routes/productRoutes";
import clienteRoutes from "./cliente/routes/clienteRoutes";
import cartItemRoutes from "./cartItem/routes/cartItemRoutes";
import cartRoutes from "./cart/routes/cartRoutes";
import saleRoutes from "./sales/routes/salesRoutes";
import voucherRoutes from "./voucher/routes/voucherRoutes";
import https from "https";
import fs from "fs";
import { errorHandler } from "./shared/middlewares/errorHandler";
import { notFoundHandler } from "./shared/middlewares/notFoundHandler";

dotenv.config();

const app: Application = express();
const port: number = parseInt(process.env.PORT as string, 10);

app.use(cors({ origin: "*" }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.use("/api/employee", employeeRoutes);
app.use("/api/product", productRoutes);
app.use("/api/client", clienteRoutes);
app.use("/api/cartItem", cartItemRoutes); // Agregar rutas de cartItem
app.use("/api/cart", cartRoutes); // Agregar rutas de cart
app.use("/api/sale", saleRoutes); // Agregar rutas de sale
app.use("/api/voucher", voucherRoutes); // Agregar rutas de voucher
app.use(notFoundHandler);

app.use(errorHandler);

const optionsHTTPS = {
  key: fs.readFileSync(String(process.env.RUTA_KEY)),
  cert: fs.readFileSync(String(process.env.RUTA_CERTIFICADO)),
};

https.createServer(optionsHTTPS, app).listen(port, () => {
  console.log("Server listening on port:", port);
});
/*
app.listen(port, () => {
  console.log("Server listening on port:", port);
});
*/