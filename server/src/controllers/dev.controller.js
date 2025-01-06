import Event from '../models/evento.model.js'
import Sesion_ from '../models/sesion.model.js'
import Premio_ from '../models/premio.model.js'
import Competidor_ from '../models/competidor.model.js'
import Resultado_ from '../models/resultado.model.js'
import Instructor_ from '../models/instructor.model.js'

class DevController {
    async registerEvento(req, res) {
        try {
            const {
                name,
                startDate,
                endDate,
                closingOfRegistratiosn,
                mode,
                cost, requirements,
                rules, kilometers,
                description
            } = req.body;
    
            const newEvent = new Event({
                name, 
                startDate,
                endDate,
                closingOfRegistratiosn,
                mode,
                cost, requirements,
                rules, kilometers,
                description
            })
            
            await newEvent.save();
    
            res.json({
                message: "registrado correctamente"
            })
        } catch (error) {
            res.status(500).json({message: error})
        }


    }

    async registerSesion(req, res) {
        try {
            const {
                eventId, 
                startDate,
                endDate,
            } = req.body;
    
            
            const eventFound = await Event.findById(eventId);
            if(!eventFound) return res.status(404).json({message: "Id del evento no encontrado"})
    
            const newSession = new Sesion_({
                eventId,
                startDate,
                endDate
            })
    
            await newSession.save();
            res.json({mesasge: "registrado correctamente"})    
        } catch (error) {
            console.log(error)
            res.status(500).json({message: error.mesasge})
        }
         
    }

    async registerPremio(req, res) {
        try {
            const {
                eventId,
                competidorId,
                resultadoId,
                merits, 
            } = req.body;
    
            const eventFound = await Event.findById(eventId);
            const coompetidorFound = await Competidor_.findById(competidorId);

            const resultadoFound = await Resultado_.findById(resultadoId);
    
            if(!eventFound || !coompetidorFound || !resultadoFound) return res.status(404).json({message: "Evento o competidor no encontrados"})
    
            const newPremio = new Premio_({
                eventId,
                competidorId,
                resultadoId,
                merits
            })
            await newPremio.save();
            res.json({message : "registrado correctamente"})
        } catch (error) {
            console.log(error)
            res.status(500).json({error})
        }
    }

    async registerCompetidor(req, res) {
        try {
            const {
                name,
                age,
                gender,
                category,
                events,
            } = req.body;
    
            const newCompetidor = new Competidor_({
                name, age, gender, category,
                events
            })
    
            await newCompetidor.save();
            res.json({message: "registrado correcatmente"})
        } catch (error) {
            res.status(500).json({message: error})
        }
    }

    async registerResultado(req, res) {
        try {
            const {
                competidorId,
                eventId, sessionId,
                distanceKm, time
            } = req.body;
    
            const newResultado = new Resultado_({
                competidorId, eventId, 
                sessionId, 
                distanceKm, time
            })
            await newResultado.save();
    
            res.json({message: "registrado correcatmente"})
        } catch (error) {
            res.status(500).json({message: error})   
        }
    }

    async registerInstructor(req, res) {
        try {
            const {
                username, 
                email,
                phone, password, 
                events
            } = req.body;
    
            const newInstructor = new Instructor_({
                username, 
                email, phone,
                password, 
                events
            })
            await newInstructor.save();
            res.json({message: "registrado correcatmente"})
        } catch (error) {
            res.status(500).json({message: error})
        }
        

    }
}

const controller = new DevController();
export const Evento = controller.registerEvento.bind(controller);
export const Sesion = controller.registerSesion.bind(controller);
export const Premio = controller.registerPremio.bind(controller);
export const Resultado = controller.registerResultado.bind(controller);
export const Competidor = controller.registerCompetidor.bind(controller);
export const Instructor = controller.registerInstructor.bind(controller);