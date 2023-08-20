import express from 'express'
import { AppointmentController } from '../controllers/appointment.controller'

const appointmentRouter = express.Router()

appointmentRouter.route('/add').post(
    (req, res) => new AppointmentController().add(req, res)
)

appointmentRouter.route('/getByPatient').post(
    (req, res) => new AppointmentController().getByPatient(req, res)
)

appointmentRouter.route('/getByDoctor').post(
    (req, res) => new AppointmentController().getByDoctor(req, res)
)

appointmentRouter.route('/isDoctorFree').post(
    async (req, res) => await new AppointmentController().checkIfDoctorIsFree(req, res)
)

export default appointmentRouter