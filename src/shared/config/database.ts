import mysql from "mysql2/promise";
import dotenv from "dotenv";

dotenv.config();


const config = {
  host: process.env.DB_HOST,
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  waitForConnections: true,
  connectionLimit: 10,
};

const pool = mysql.createPool(config);

export async function query(sql: string, params?: any[]) {
  try {
    const conn = await pool.getConnection();
    console.log("Conexión exitosa a la BD");
    const [results] = await conn.execute(sql, params);
    conn.release();
    return results;
  } catch (error) {
    console.log("Error en la consulta:", error);
    throw error; // Lanza el error para que el repositorio lo maneje
  }
}

export default pool;
