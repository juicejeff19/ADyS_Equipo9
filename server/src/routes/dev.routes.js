import { Router } from "express";
import {Evento, Sesion, Premio, Resultado, Competidor, Instructor} from '../controllers/dev.controller.js'
import {validateCompetidorData} from '../middlewares/validarIdCompetidor.js'
import {validateResultadoData} from '../middlewares/validarIdResultado.js'
import { validateInstructorData } from "../middlewares/validarIdInstructor.js";

const router = Router();


router.post("/registrarEvento", Evento);
router.post("/registrarSesion", Sesion);
//router.post("/registrarAdmin", login);
//router.post("/registrarSuAdmin", login);
router.post("/registrarPremio", Premio);
router.post("/registrarResultado", validateResultadoData,Resultado);
//router.post("/registrarCompetidor", validateCompetidorData ,Competidor);
router.post("/registrarInstructor", validateInstructorData, Instructor);


export default router;