import mongoose from "mongoose";

const freeDaysSchema = new mongoose.Schema({
    begin: {
        type: Date,
        required: true
    },
    end: {
        type: Date,
        required: true
    },
    doctor: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'DoctorModel',
        required: true
    }
})

export default mongoose.model('FreeDays', freeDaysSchema, 'free_days')