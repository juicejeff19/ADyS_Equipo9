import Admin from '../models/admin.model.js'
import Evento from '../models/evento.model.js'
import TipoEvent from '../models/tipoEvento.model.js'
import Competidor from '../models/competidor.model.js'
import Premio from '../models/premio.model.js'
import bcrypt from 'bcryptjs';
// import pdfDocument from 'pdfkit';
// import jwt from 'jsonwebtoken';
import { buildPDF } from '../libs/pdfKit.js'
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
            if (!adminFound) return res.status(404).json(["correo no encontrado"])

            const passwordMatch = await bcrypt.compare(password, adminFound.password);
            if (!passwordMatch) return res.status(401).json(["contraseña incorrecta"]);


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
            const eventFound = await TipoEvent.findOne({ name });

            if (!eventFound) {
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
                //res.redirect(`/clubleones/admin/profile/crearSesiones/${newEventSaved._id}`)

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
        const { name, description } = req.body;
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

    async crearSesiones(req, res) {
        try {
            const {
                eventId,
                startDate,
                endDate,
            } = req.body;


            const eventFound = await Event.findById(eventId);
            if (!eventFound) return res.status(404).json({ message: "Id del evento no encontrado" })

            const newSession = new Sesion_({
                eventId,
                startDate,
                endDate
            })

            await newSession.save();

            res.json({ mesasge: "registrado correctamente" })
        } catch (error) {
            console.log(error)
            res.status(500).json({ message: error.mesasge })
        }
    }

    async getInfoCompetidor(req, res) {
        try {
            const {
                idCompetidor
            } = req.params.id;

            const competidorFounded = await Competidor.findById(idCompetidor)
                .populate('name')
                .populate('age')
                .populate('gender')
                .populate('category')
                .populate('events')
                .exec();

            if (!competidorFounded) return res.status(404).json(["Competidor no encontrado"])



            res.json(competidorFounded);
        } catch (error) {
            res.status(500).json({ message: error.mesasge })
        }

    }

    async createPremio(req, res) {
        try {
            console.log("llega aqui");
            const idCompetidor = req.params.idCompetidor;
            console.log(idCompetidor)

            const competidorFound = await Premio.findOne({ competidorId: idCompetidor })
                //console.log(competidorFound)
                .populate({
                    path: 'eventId',
                    select: 'name'
                })
                .populate({
                    path: 'competidorId',
                    select: 'name'
                })
                .populate({
                    path: 'resultadoId',
                    select: 'distanceKm time',
                })
            //console.log("acaba con populate")


            if (!competidorFound) return res.status(404).json(["El competidor no tiene premios"])


            // const stream = res.writeHead(200, {
            //     "Content-Type": "application/pdf",
            //     "Content-Disposition": "atachment; filename = reconocimiento.pdf"
            // })
            // buildPDF((data) => stream.write(data), () =>
            //     stream.end())
            res.setHeader('Content-Type', 'application/pdf');
        res.setHeader('Content-Disposition', 'attachment; filename=reconocimiento.pdf');

        // Generar y enviar el PDF
        buildPDF(competidorFound, (data) => res.write(data), () => res.end());

        } catch (error) {
            console.log("aqui error")
            res.status(500).json({ message: error.mesasge })
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
export const crearSesiones = controller.crearSesiones.bind(controller);
export const getCompetidor = controller.getInfoCompetidor.bind(controller);
export const crearPDF = controller.createPremio.bind(controller);