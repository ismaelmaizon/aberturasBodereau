
import { response } from "express";
import { pool } from "../db.js";
import { DataTime, generarIDAleatorioVentas } from "../utils.js";

//agregar un producto a un lugar
export const registrarVenta = async (req, res) =>{
    const {id} = req.params
    const fecha = DataTime()
    const id_venta = generarIDAleatorioVentas(10)
    console.log(id);    
    console.log(fecha);    
    console.log(req.body);  
    const { id_producto, idGenerate, Tipo, cantidad, nombre, apellido, mail, cel } = req.body  
try{
   
    }catch(error) {
        return res.status(500).json({ message: "Something goes wrong" });
  }
} 