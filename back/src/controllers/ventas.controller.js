
import { response } from "express";
import { pool } from "../db.js";
import { DataTime, generarIDAleatorioVentas } from "../utils.js";

//registrar venta
export const registrarVenta = async (req, res) =>{
    const {cliente, total} = req.body
    const fecha = DataTime()
    const id_venta = generarIDAleatorioVentas(10)
    const { nombre, apellido, mail, cel } = cliente
    console.log(id_venta);
    try {
        const [rows] = await pool.query(
            "INSERT INTO ventas (id_venta, fecha, nombre, apellido, mail, cel, total) VALUES (?, ?, ?, ?, ?, ?, ?);",[
              id_venta, fecha, nombre, apellido, mail, cel, total]
          );
        console.log(rows);
        if (rows) {
          res.status(200).json({ message: 'registro creado', id: id_venta});
        }
      } catch (error) {
        return res.status(500).json({ message: "Something goes wrong" });
      }

} 

//registrar asociar producto a venta
export const registrarProdVenta = async (req, res) =>{
  const {id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal} = req.body
  console.log(id_venta);
  try {
      const [rows] = await pool.query(
          "INSERT INTO ventasProduct (id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal) VALUES (?, ?, ?, ?, ?, ?);",[
            id_venta, id_producto, IdGenerate, Tipo, cantidad, subtotal]
        );
      console.log(rows);
      if (rows) {
        res.status(200).json({ message: 'producto agregado', response: rows});
      }
    } catch (error) {
      return res.status(500).json({ message: "Something goes wrong" });
    }

} 