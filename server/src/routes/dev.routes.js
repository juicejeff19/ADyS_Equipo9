import { Router } from "express";
import {Evento, Sesion, Premio, Resultado, Competidor} from '../controllers/dev.controller.js'

const router = Router();


router.post("/registrarEvento", Evento);
router.post("/registrarSesion", Sesion);
//router.post("/registrarAdmin", login);
//router.post("/registrarSuAdmin", login);
router.post("/registrarPremio", Premio);
router.post("/registrarResultado", Resultado);
router.post("/registrarCompetidor", Competidor);
//router.post("/registrarCompetidor", login);


export default router;