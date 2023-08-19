import express from 'express'
import { ExaminationController } from '../controllers/examination.controller'

const examinationRouter = express.Router()

examinationRouter.route('/add').post(
    (req, res) => new ExaminationController().add(req, res)
)

examinationRouter.route('/delete').post(
    (req, res) => new ExaminationController().delete(req, res)
)

examinationRouter.route('/changeStatus').post(
    (req, res) => new ExaminationController().changeStatus(req, res)
)

export default examinationRouter
