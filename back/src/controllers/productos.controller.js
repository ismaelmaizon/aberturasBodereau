import { pool } from "../db.js";
import {DataTime, generarIDAleatorio} from "../utils.js";

export const getProductos = async (req, res) => {
  let productos = []
  try {
    const [rows] = await pool.query("SELECT * FROM productos");
    rows.map((pac) =>{
      productos.push(pac)
    })
    res.send( {status: 200, message: 'succes', response: productos} );
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const getProducto = async (req, res) => {
  try {
    const { ti } = req.params;
    console.log(ti);
    const [rows] = await pool.query("SELECT * FROM productos WHERE Tipo = ?", [
      ti,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "paciente not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createProducto = async (req, res) => {
  const { Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U } = req.body;
  const stock = 0
  const idGenerate = generarIDAleatorio(10)
  console.log(idGenerate,Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock);
  try {
    const [rows] = await pool.query(
      "INSERT INTO productos (IdGenerate, Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [idGenerate,Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock]
    );
    res.status(201).json({ id: rows.insertId, Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
