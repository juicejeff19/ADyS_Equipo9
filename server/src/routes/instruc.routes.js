import { Router } from "express";
import {register, login, logout, profile, registerResults, modifyDates} from '../controllers/instruc.controller.js'
import {authRequired} from '../middlewares/validarTokenInstruc.js';

const router = Router();

//router.post("/register", register)
router.post("/login", login)
router.post("/logout", logout);
router.get("/profile",  authRequired, profile);
router.get("/profile/create",  authRequired, profile);//
router.post("/profile/registerResults",  authRequired, registerResults);
router.patch("/profile/modifyDates",  authRequired, modifyDates);

router.get("/", ()=> {
    console.log("bienvenidoooo")
})

export default router;