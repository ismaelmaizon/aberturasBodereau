import { Router } from "express";

import { getLugares } from "../controllers/lugares.controller.js";

const router = Router();

// GET lugares
router.get("/lugares", getLugares);


export default router;
