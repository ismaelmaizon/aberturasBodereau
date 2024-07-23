import { Router } from "express";
import { registrarVenta, registrarProdVenta } from "../controllers/ventas.controller.js";




const router = Router()



router.post("/registrarVenta", registrarVenta)
router.post("/registrarProdVenta", registrarProdVenta)

export default router