import mongoose from "mongoose";

const premioSchema = new mongoose.Schema({
    eventId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Evento", 
        required: true 
    }, 
    competidorId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Competidor", 
        required: true 
    }, 
    resultadoId: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Resultado" 
    }, 
    merits: { 
        type: String 
    }, 
}, {
    timestamps: true
});

export default mongoose.model("Premio", premioSchema);
