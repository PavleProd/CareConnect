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
    address: {
        type: String
    },
    phone: {
        type: String
    },
    email: {
        type: String
    },
    type: {
        type: String,
        enum: ['Patient', 'Doctor', 'Manager'],
    },
    profilePicture: {
        type: String,
        default: "profile_pictures/default.jpg"
    },
    status: {
        type: String,
        enum: ['Pending', 'Approved', 'Rejected'],
        required: function () {
            return this.type === 'Patient'
        }
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

