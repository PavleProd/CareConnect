import mongoose from "mongoose";

const medicalReportSchema = new mongoose.Schema({
    patient: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel',
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorModel',
        required: true
    },
    appointment: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'AppointmentModel',
        required: true
    },
    visitReason: {
        type: String,
        required: true
    },
    diagnosis: {
        type: String,
        required: true
    },
    therapy: {
        type: String,
        required: true
    },
    controlDate: {
        type: Date,
        required: true
    }
})

export default mongoose.model('MedicalReportModel', medicalReportSchema, 'medical_reports')