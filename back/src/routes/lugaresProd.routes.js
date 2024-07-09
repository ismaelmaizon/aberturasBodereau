import { Router } from "express";
import { addproductolugar, deleteproductolugar, getProductosLugar, getUbicacionProducto, upDateStockProducto } from "../controllers/lugaresProd.controller.js";




const router = Router()




router.get("/getUbicacionProducto/:idg", getUbicacionProducto)
router.get("/getProductosLugar/:idl", getProductosLugar);
router.put("/upDateStockProducto/:idg", upDateStockProducto)


router.post("/addProductoLugar/:idg", addproductolugar)
router.post("/deleteProductoLugar/:idg", deleteproductolugar)



export default router