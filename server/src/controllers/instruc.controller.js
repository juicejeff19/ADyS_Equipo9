import Instruc from '../models/instructor.model.js'
import bcrypt from 'bcryptjs';
import createAccessToken from '../libs/jwt.js';
import { SALT_ROUNDS } from '../config.js';
import Resultado from "../models/resultado.model.js"; 
import Competidor from "../models/competidor.model.js"; 
import Sesion from "../models/sesion.model.js"; 
import Evento from "../models/evento.model.js"; 




class InstructorController {
    async register(req, res) {
        const { username, email, phone, password } = req.body;

        try {
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const newInstruc = new Instruc({
                username,
                email,
                phone,
                password: hashedPassword,
            });

            const instrucSaved = await newInstruc.save();

            const token = createAccessToken({ id: instrucSaved._id });
            res
                .cookie('acces_token', token, {
                    httpOnly: true,
                })
                .json({
                    id: instrucSaved._id,
                    username: instrucSaved.username,
                    email: instrucSaved.email,
                });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async login(req, res) {
        const { email, password } = req.body;

        try {
            const instrucFound = await Instruc.findOne({ email });

            if (!instrucFound) {
                return res.status(404).json({ message: "Instructor no encontrado en la base de datos" });
            }

            const compareInstruc = await bcrypt.compare(password, instrucFound.password);

            if (!compareInstruc) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const token = createAccessToken({ id: instrucFound._id });

            res
                .cookie('acces_token', token, {
                    httpOnly: true,
                })
                .json({
                    id: instrucFound._id,
                    username: instrucFound.username,
                });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    logout(req, res) {
        try {
            res.cookie('acces_token', "", {
                expires: new Date(0),
                httpOnly: true,
            });
            return res.status(200).json({ message: "Logout exitoso" });
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
    }

    async profile(req, res) {
        const instrucFound = await Instruc.findById(req.instruc.id);


        if (!instrucFound) return res.status(400).json({ message: "Instruc not founf" });

        return res.json({
            id: instrucFound._id,
            username: instrucFound.username,
            email: instrucFound.email
        })

    }

    async registerResults(req, res) {
        const { name, eventId, sessionId, category, gender, distanceKm, time, age } = req.body;
    
        try {
            // Buscar al competidor por nombre
            const competidor = await Competidor.findOne({
                name
            });
    
            // Validar si el competidor existe
            if (!competidor) {
                return res.status(404).json({ message: "Competidor no encontrado con el nombre, categoría y género especificados."});
            }
    
            // Verificar si el competidor está registrado en el evento
            const eventoFounded = await Evento.findById(eventId);
    
            if (!eventoFounded) {
                return res.status(400).json({
                    message: "El competidor no está registrado en el evento especificado.",
                });
            }
    
            // Verificar si la sesión pertenece al evento del competidor
            const sessionFounded = await Sesion.findById(sessionId);
    
            if (!sessionFounded) {
                return res.status(400).json({
                    message: "El competidor no está registrado en la sesión especificada.",
                });
            }
    
            // Crear un nuevo resultado
            const newResult = new Resultado({
                competidorId: competidor._id,
                eventId,
                sessionId,
                distanceKm,
                time,
                gender, 
                category, 
                age
            });
    
            // Guardar el resultado en la base de datos
            const resultSaved = await newResult.save();
    
            // Devolver la respuesta al cliente con los datos del competidor y el resultado
            return res.json({
                id: resultSaved._id,
                name: competidor.name,
                age: competidor.age,
                gender: competidor.gender,
                category: competidor.category,
                eventId: resultSaved.eventId,
                sessionId: resultSaved.sessionId,
                distanceKm: resultSaved.distanceKm,
                time: resultSaved.time,
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }

    async modifyDates(req, res) {
        const { name, eventId, startDate, endDate, closingOfRegistratiosn, sessions } = req.body;
    
        try {
            // Buscar el evento por nombre y verificar que existe
            const evento = await Evento.findOne({ name });
    
            if (!evento) {
                return res.status(404).json({ message: "Evento no encontrado con el nombre especificado." });
            }
    
            // Verificar si el evento con el ID proporcionado existe
            const eventoFounded = await Evento.findById(eventId);
    
            if (!eventoFounded) {
                return res.status(400).json({
                    message: "El evento no ha sido registrado.",
                });
            }
    
            // Actualizar las fechas del evento existente
            eventoFounded.startDate = startDate;
            eventoFounded.endDate = endDate;
            eventoFounded.closingOfRegistratiosn = closingOfRegistratiosn;
            eventoFounded.sessions = sessions;
    
            // Guardar los cambios en la base de datos
            const updatedEvento = await eventoFounded.save();
    
            // Devolver la respuesta al cliente con los datos actualizados
            return res.json({
                id: updatedEvento._id,
                name: updatedEvento.name,
                startDate: updatedEvento.startDate,
                endDate: updatedEvento.endDate,
                closingOfRegistratiosn: updatedEvento.closingOfRegistratiosn,
                sessions: updatedEvento.sessions
            });
        } catch (error) {
            return res.status(500).json({ message: error.message });
        }
    }
    
    
}
//Comentario de mi rama

const controller = new InstructorController();
export const register = controller.register.bind(controller);
export const login = controller.login.bind(controller);
export const logout = controller.logout.bind(controller);
export const profile = controller.profile.bind(controller);
export const registerResults = controller.registerResults.bind(controller);
export const modifyDates = controller.modifyDates.bind(controller);
