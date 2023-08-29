import express from 'express'
import MedicalReportController from '../controllers/medical_report.controller'

const medicalReportRouter = express.Router()

medicalReportRouter.route('/getByPatient').post(
    (req, res) => new MedicalReportController().getPatientMedicalReports(req, res)
)

export default medicalReportRouter