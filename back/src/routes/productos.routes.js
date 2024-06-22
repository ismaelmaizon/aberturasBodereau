import { Router } from "express";
import {
  createProducto,
  deletePaciente,
  getProducto,
  getProductos,
} from "../controllers/productos.controller.js";

const router = Router();

// GET todos los /productos
router.get("/productos", getProductos);
// GET un producto
router.get("/producto/:ti", getProducto);

// DELETE un producto
router.delete("/producto/:HC", deletePaciente);

// INSERT un producto
router.post("/producto", createProducto);

// UPDATE un producto

export default router;
