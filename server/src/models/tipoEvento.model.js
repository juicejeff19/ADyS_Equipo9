import mongoose from "mongoose";

const typeEventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: false,
    }
},{
    timestamps: true
})

export default mongoose.model('TipoEvento', typeEventSchema);
