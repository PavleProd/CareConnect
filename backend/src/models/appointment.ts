import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    date: {
        type: Date,
        required: true
    },
    examination: {
        type: String,
        required: true
    },
    doctor: {
        type: String,
        required: true
    },
    patient: {
        type: String,
        required: true
    }
})

export default mongoose.model('Appointment', appointmentSchema, 'appointments')