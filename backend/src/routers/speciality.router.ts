import express from 'express'
import { SpecialityController } from '../controllers/speciality.controller'

const specialityRouter = express.Router()

specialityRouter.route('/get').post(
    (req, res) => new SpecialityController().get(req, res)
)

specialityRouter.route('/add').post(
    (req, res) => new SpecialityController().add(req, res)
)

export default specialityRouter