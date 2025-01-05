import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    eventId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Evento",
        required: true,
    },
    startDate: {
        type: Date,
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    completed: {
        type: Boolean,
        default: false, 
    }
}, {
    timestamps: true,
});


export default mongoose.model("Sesion", sessionSchema);