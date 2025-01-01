import mongoose from "mongoose";

const resultadoSchema = new mongoose.Schema({
    competidorId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competidor',
        required: true,
    },
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Evento',
        required: true,
    },
    sessionId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Sesion',
        required: true,
    },
    distanceKm: {
        type: Number, 
        required: false,
    },
    time: {
        type: String, 
        required: false,
    },
}, {
    timestamps: true,
});

export default mongoose.model('Resultado', resultadoSchema);
