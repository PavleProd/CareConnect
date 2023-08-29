import MedicalReportModel from '../models/medical_report'
import express from 'express'
export default class MedicalReportController {

    getPatientMedicalReports(req: express.Request, res: express.Response) {
        let patientID = req.body.patient._id

        MedicalReportModel.find({ 'patient': patientID }).populate(['patient', 'doctor', 'appointment']).then(medicalReports => {
            res.json(medicalReports)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }
}