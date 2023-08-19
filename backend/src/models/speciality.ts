import mongoose from "mongoose";

const Schema = mongoose.Schema

const Speciality = new Schema({
    name: {
        type: String,
        required: true
    },
    examinations: [{
        type: Schema.Types.ObjectId,
        ref: "ExaminationModel"
    }]
})

export default mongoose.model("SpecialityModel", Speciality, "specialities")