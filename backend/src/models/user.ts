import mongoose from "mongoose";

const Schema = mongoose.Schema;

let User = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    name: {
        type: String
    },
    surname: {
        type: String
    },
    adress: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String
    },
    licenceNumber: {
        type: Number,
        required: function () {
            return this.type === 'Doctor';
        }
    },
    speciality: {
        type: String,
        required: function () {
            return this.type === 'Doctor';
        }
    },
    department: {
        type: String,
        required: function () {
            return this.type === 'Doctor';
        }
    },
});

export default mongoose.model('User', User, 'users');

