import { FreeDaysController } from "../controllers/free_days.controller";
import express from 'express'

const freeDaysRouter = express.Router()

freeDaysRouter.route('/add').post(
    (req, res) => new FreeDaysController().add(req, res)
)

freeDaysRouter.route('/checkIfDoctorIsFree').post(
    (req, res) => new FreeDaysController().checkIfDoctorIsFree(req, res)
)

export default freeDaysRouter