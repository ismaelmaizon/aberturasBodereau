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
    const { idg } = req.params;
    console.log(idg);
    const [rows] = await pool.query("SELECT * FROM productos WHERE IdGenerate = ?", [
      idg,
    ]);

    if (rows.length <= 0) {
      return res.status(404).json({ message: "producto not found" });
    }

    res.json(rows[0]);
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};

export const createProducto = async (req, res) => {
  console.log('body');
  console.log(req.body);
  
  const { Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U } = req.body;
  const stock = 0
  const idGenerate = generarIDAleatorio(10)
  console.log(idGenerate,Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock);
  try {
    const [rows] = await pool.query(
      "INSERT INTO productos (IdGenerate, Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?);",
      [idGenerate,Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock]
    );
    console.log(rows);
    res.status(200).json({ id: rows.insertId, Tipo, Descripcion, Ancho, Alto, Izq, Derc, Precio_U, stock });
  } catch (error) {
    return res.status(500).json({ message: "Something goes wrong" });
  }
};
