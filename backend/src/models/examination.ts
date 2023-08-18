import mongoose from "mongoose";

const Schema = mongoose.Schema;

const Examination = new Schema({
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Approved", "Pending"]
    },
    duration: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    speciality: {
        type: String,
        required: true
    }
})

export default mongoose.model("ExaminationMdeol", Examination, "examinations")