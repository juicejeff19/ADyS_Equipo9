import mongoose from "mongoose";

const competidorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    age: {
        type: Number,
        required: true,
    },
    gender: {
        type: String,
        enum: ['hombre', 'mujer'],
        required: true,
    },
    category: {
        type: String,
        enum: ['infantil', 'juvenil', 'adulto'],
        required: true,
    },
    events: [
        {
            eventId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Evento',
                required: true,
            },
            year: {
                type: Number,
                required: true,
            },
            sessions: [
                {
                    sessionId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: 'Sesion',
                        required: true,
                    },
                },
            ],
        },
    ],
}, {
    timestamps: true,
});

export default mongoose.model('Competidor', competidorSchema);
