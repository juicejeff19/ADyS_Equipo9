import Admin from '../models/admin.model.js'
import Evento from '../models/evento.model.js'
import TipoEvent from '../models/tipoEvento.model.js'
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import createAccessToken from '../libs/jwt.js';
import { SALT_ROUNDS, expiration, SECRET_JWT_KEY } from '../config.js';


class AdminController {
    async register(req, res) {
        const { username, email, password } = req.body;
        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const newAdmin = new Admin({
                username,
                email,
                password: hashedPassword,
            })

            const adminSaved = await newAdmin.save();

            //en el payload no asignamos contaseña 
            //o direccion para no exponer esos datos a
            //alguien que pueda acceder al token
            const token = createAccessToken({ id: adminSaved._id });
            res
                .cookie('acces_token', token, {
                    httpOnly: true
                })
                .json({
                    id: adminSaved._id,
                    username: adminSaved.username,
                    email: adminSaved.email
                });

        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const adminFound = await Admin.findOne({ email })
            if (!adminFound) return res.status(404).json({ message: "admin   no encontrado" })

            const compareAdmin = await bcrypt.compare(password, adminFound.password);

            if (!compareAdmin) return res.status(401).json({ message: "Unauthrorized" })


            const token = createAccessToken({ id: adminFound._id });
            res
                .cookie('acces_token', token, {
                    httpOnly: true
                })
                .json({
                    id: adminFound._id,
                    username: adminFound.username,
                });

        } catch (error) {
            //console.log("entra aqui");
            res.status(500).json({ message: error.message })
        }
    }

    logout(req, res) {
        //res.status(500).json({message: "hola"})
        try {
            console.log("intentando limpiar cookie")
            res.cookie('acces_token', "", {
                expires: new Date(0),
                httpOnly: true,
            })
            console.log("cookie bien limpiada")
            return res.status(200).json({ message: "Logout exitoso" });;
        } catch (error) {
            res.status(500).json({ message: error.message })
        }

    }

    async profile(req, res) {
        const adminFound = await Admin.findById(req.admin.id);

        if (!adminFound) return res.status(400).json({ message: "Admin not founf" });

        return res.json({
            id: adminFound._id,
            username: adminFound.username,
            email: adminFound.email
        })
    }

    async registrarEvento(req, res) {
        const { 
            name, 
            startDate, 
            endDate,  
            closingOfRegistratiosn, 
            mode, 
            cost, 
            typeEvent, 
            requirements, 
            rules, 
            callPublished, 
            kilometers,  
            sessions,
            description
        } = req.body;
        try {
            const eventFound = await TipoEvent.findOne({name});

            if(!eventFound) {
                const newTypeEvent = new TipoEvent({
                    name,
                    description
                })
                
                const newTypeEventSaved = await newTypeEvent.save();

                const newEvent = new Evento({
                    name,
                    startDate,
                    endDate,
                    closingOfRegistratiosn, mode, cost, 
                    typeEvent: newTypeEventSaved.name,
                    requirements, rules, callPublished, kilometers, 
                    sessions,
                    description: newTypeEventSaved.description
                });

                const newEventSaved = await newEvent.save();

                return res.json({
                    name: newEventSaved.name,
                    startDate: newEventSaved.startDate,
                    endDate: newEventSaved.endDate,
                    closingOfRegistratiosn: newEventSaved.closingOfRegistratiosn,
                    sessions: newEventSaved.sessions,
                    description: newEventSaved.description
                })
            } else {
                const newEvent = new Evento({
                    name,
                    startDate,
                    endDate,
                    closingOfRegistratiosn, mode, cost, 
                    typeEvent,
                    requirements, rules, callPublished, kilometers, 
                    sessions,
                    description
                });

                const newEventSaved = await newEvent.save();

                return res.json({
                    name: newEventSaved.name,
                    startDate: newEventSaved.startDate,
                    endDate: newEventSaved.endDate,
                    closingOfRegistratiosn: newEventSaved.closingOfRegistratiosn,
                    sessions: newEventSaved.sessions,
                    description: newEventSaved.description
                })
            }
            
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
    }

    async registarTipoEvento(req, res) {
        const { name, description} = req.body;
        try {
            const newType = new TipoEvent({
                name, 
                description
            })
            await newType.save();
            res.json({ message: "ok" });

        } catch (error) {
            console.log(error)
        }
    }
}

const controller = new AdminController();
export const register = controller.register.bind(controller);
export const login = controller.login.bind(controller);
export const logout = controller.logout.bind(controller);
export const profile = controller.profile.bind(controller);
export const registarEvento = controller.registrarEvento.bind(controller);
export const tipoEvento = controller.registarTipoEvento.bind(controller);