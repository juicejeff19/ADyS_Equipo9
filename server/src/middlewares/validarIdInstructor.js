import Evento from '../models/evento.model.js';

export const validateInstructorData = async (req, res, next) => {
    try {
        const { events } = req.body;

        // Verificar que se proporcionen eventos
        if (!events || !Array.isArray(events) || events.length === 0) {
            return res.status(400).json({ error: "Debes proporcionar al menos un evento en la solicitud." });
        }

        // Validar cada evento y sus sesiones
        for (const event of events) {
            const { eventId, sessions } = event;

            // Validar que el ID del evento exista
            const eventoExists = await Evento.exists({ _id: eventId });
            if (!eventoExists) {
                return res.status(400).json({ error: `El evento con ID ${eventId} no existe.` });
            }
        }

        // Si todo está correcto, continuar con el siguiente middleware/controlador
        next();
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "error al validar los datos del instructor." });
    }
};
