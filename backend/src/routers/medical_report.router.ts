import express from 'express'
import MedicalReportController from '../controllers/medical_report.controller'

const medicalReportRouter = express.Router()

medicalReportRouter.route('/getByPatient').post(
    (req, res) => new MedicalReportController().getPatientMedicalReports(req, res)
)

medicalReportRouter.route('/create').post(
    (req, res) => new MedicalReportController().createMedicalReport(req, res)
)

export default medicalReportRouter