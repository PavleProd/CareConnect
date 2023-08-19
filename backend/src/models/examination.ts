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
        default: 30
    },
    price: {
        type: Number,
        required: true
    }
})

export default mongoose.model("ExaminationModel", Examination, "examinations")