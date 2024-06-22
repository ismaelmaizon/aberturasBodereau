import { Router } from "express";
import { addproductolugar, deleteproductolugar, getUbicacionProducto, upDateStockProducto } from "../controllers/lugaresProd.controller.js";




const router = Router()




router.get("/getUbicacionProducto/:ti", getUbicacionProducto)
router.put("/upDateStockProducto/:ti", upDateStockProducto)


router.post("/addProductoLugar/:ti", addproductolugar)
router.post("/deleteProductoLugar/:ti", deleteproductolugar)



export default router