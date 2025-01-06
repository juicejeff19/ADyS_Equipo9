import mongoose from "mongoose";

const instrucSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    phone: { type: String },
    password: {
      type: String, 
      required: true,
    },
    events: [
      {
        eventId: { type: String, required: true },
      }
    ]
}, {
    timestamps: true
});


export default mongoose.model('Instructor', instrucSchema);