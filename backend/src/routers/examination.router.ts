import express from 'express'
import { ExaminationController } from '../controllers/examination.controller'

const examinationRouter = express.Router()

examinationRouter.route('/add').post(
    async (req, res) => await new ExaminationController().add(req, res)
)

examinationRouter.route('/delete').post(
    async (req, res) => await new ExaminationController().delete(req, res)
)

examinationRouter.route('/changeStatus').post(
    (req, res) => new ExaminationController().changeStatus(req, res)
)

examinationRouter.route('/changeExamination').post(
    (req, res) => new ExaminationController().changeExamination(req, res)
)

export default examinationRouter
