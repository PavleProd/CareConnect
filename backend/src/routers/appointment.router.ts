import express from 'express'
import { AppointmentController } from '../controllers/appointment.controller'

const appointmentRouter = express.Router()

appointmentRouter.route('/add').post(
    (req, res) => new AppointmentController().add(req, res)
)

appointmentRouter.route('/delete').post(
    (req, res) => new AppointmentController().delete(req, res)
)

appointmentRouter.route('/getByPatient').post(
    (req, res) => new AppointmentController().getByPatient(req, res)
)

appointmentRouter.route('/getByDoctor').post(
    (req, res) => new AppointmentController().getByDoctor(req, res)
)

appointmentRouter.route('/isDoctorFree').post(
    (req, res) => new AppointmentController().checkIfDoctorIsFree(req, res)
)

appointmentRouter.route('/getByDoctorAndPatient').post(
    (req, res) => new AppointmentController().getByDoctorAndPatient(req, res)
)

export default appointmentRouter