
import { response } from "express";
import { pool } from "../db.js";
import { DataTime, generarIDAleatorioVentas } from "../utils.js";

//registrar venta
export const registrarVenta = async (req, res) =>{
    const {cliente, cart, total} = req.body
    const fecha = '2024-07-21 22:07:04'
    const id_venta = generarIDAleatorioVentas(10)
    
    const { nombre, apellido, mail, cel } = cliente
    
    try {
        const [rows] = await pool.query(
            "INSERT INTO ventas (id_venta, fecha, nombre, apellido, mail, cel, total) VALUES (?, ?, ?, ?, ?, ?, ?);",[
              id_venta, fecha, nombre, apellido, mail, cel, total]
          );
        console.log(rows);
        if (rows) {
          res.send({status: 200, message: 'registro creado', res: id_venta})
        }
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }

} 