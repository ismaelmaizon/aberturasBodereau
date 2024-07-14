import { Router } from "express";
import { registrarVenta } from "../controllers/ventas.controller.js";




const router = Router()



router.post("/registrarVenta/:id", registrarVenta)

export default router