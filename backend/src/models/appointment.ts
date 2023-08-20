import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    dateAndTime: {
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
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending'],
        required: true
    }
})

export default mongoose.model('Appointment', appointmentSchema, 'appointments')