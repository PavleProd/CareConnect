import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema({
    dateAndTime: {
        type: Date,
        required: true
    },
    examination: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ExaminationModel',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    status: {
        type: String,
        enum: ['Approved', 'Pending'],
        required: true
    }
})

export default mongoose.model('Appointment', appointmentSchema, 'appointments')