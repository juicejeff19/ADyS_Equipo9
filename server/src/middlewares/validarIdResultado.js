import Competidor from '../models/competidor.model.js';
import Evento from '../models/evento.model.js';
import Sesion from '../models/sesion.model.js';

export const validateResultadoData = async (req, res, next) => {
    try {
        const { competidorId, eventId, sessionId } = req.body;

        // Verificar que se proporcionen los IDs
        if (!competidorId || !eventId || !sessionId) {
            return res.status(400).json({
                error: "Los campos competidorId, eventId y sessionId son obligatorios.",
            });
        }

        // Validar que el ID del competidor exista
        const competidorExists = await Competidor.exists({ _id: competidorId });
        if (!competidorExists) {
            return res.status(400).json({ error: `El competidor con ID ${competidorId} no existe.` });
        }

        // Validar que el ID del evento exista
        const eventoExists = await Evento.exists({ _id: eventId });
        if (!eventoExists) {
            return res.status(400).json({ error: `El evento con ID ${eventId} no existe.` });
        }

        // Validar que el ID de la sesión exista
        const sesionExists = await Sesion.exists({ _id: sessionId });
        if (!sesionExists) {
            return res.status(400).json({ error: `La sesión con ID ${sessionId} no existe.` });
        }

        // Validar que el competidor esté registrado en el evento
        const competidor = await Competidor.findById(competidorId);
        const isEventRegistered = competidor.events.some(
            (event) => event.eventId.toString() === eventId
        );
        if (!isEventRegistered) {
            return res.status(400).json({
                error: `El competidor con ID ${competidorId} no está registrado en el evento con ID ${eventId}.`,
            });
        }

        // Validar que la sesión pertenezca al evento
        const sesion = await Sesion.findById(sessionId);
        if (sesion.eventId.toString() !== eventId) {
            return res.status(400).json({
                error: `La sesión con ID ${sessionId} no pertenece al evento con ID ${eventId}.`,
            });
        }

        // Si todas las validaciones son correctas, continuar con el siguiente middleware/controlador
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error al validar los datos del resultado" });
    }
};
