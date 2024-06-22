//estas dos lineas de codigo me permiten lee variables de entorno
import { config } from "dotenv";
config();

export const PORT = process.env.PORT || 8080;
export const DB_HOST = process.env.DB_HOST || "127.0.0.1";
export const DB_USER = process.env.DB_USER || "root";
export const DB_PASSWORD = process.env.DB_PASSWORD || "Ism42976m41";
export const DB_DATABASE = process.env.DB_DATABASE || "stockdb";
export const DB_PORT = process.env.DB_PORT || 3306;
