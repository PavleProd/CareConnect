import mongoose from "mongoose";

const Schema = mongoose.Schema

const Speciality = new Schema({
    name: {
        type: String,
        required: true
    },
    examinations: {
        type: Array
    }
})

export default mongoose.model("SpecialityModel", Speciality, "specialities")