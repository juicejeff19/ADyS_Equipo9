import { Router } from "express";
import { tipoEvento,login, logout, profile, registarEvento} from '../controllers/admin.controller.js'
import {authRequired} from '../middlewares/validarTokenAdmin.js';
const router = Router();

//router.post("/register", register)
//router.post("/registrarTipo", tipoEvento);
router.post("/login", login)
router.post("/logout", authRequired,logout);
router.get("/profile",  authRequired, profile);
router.post("/profile/registrarEvento",  authRequired, registarEvento);
//aqui se pueden implementar mas rutas para mas acciones del admin
router.get("/", ()=> {
    console.log("bienvenido")
})

export default router;