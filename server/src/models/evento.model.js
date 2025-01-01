import mongoose from "mongoose";

const eventoSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    startDate: {
        type: Date, 
        required: true,
    },
    endDate: {
        type: Date,
        required: true,
    },
    closingOfRegistratiosn: {
        type: Date,
        required: true, 
    },
    mode: {
        type: [String],
        enum: ["relay", "individual"],
        required: true
    },
    cost: {
        type: Number,
        required: true,
    },
    // typeEvent: {
    //     type: String,
    //     //ref: 'TipoEvento',  
    //     required: true  
    // },
    requirements: {
        type: String,
        require: true,
    },
    rules: {
        type: String,
        require: true,
    },
    callPublished: {
        type: Boolean,
        default: false,
    },
    
    kilometers: {
        type: Number,
        required: true,
    },
    sessions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Sesion"
    }],
    description: { 
        type: String, 
        //ref: 'TipoEvento',
        required: false },

}, {
    timestamps: true
});


export default mongoose.model('Evento', eventoSchema)