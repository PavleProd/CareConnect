import express from 'express'
import { SpecialityController } from '../controllers/speciality.controller'

const specialityRouter = express.Router()

specialityRouter.route('/get').post(
    (req, res) => new SpecialityController().get(req, res)
)

export default specialityRouter