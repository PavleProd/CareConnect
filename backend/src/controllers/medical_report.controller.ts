import MedicalReportModel from '../models/medical_report'
import express from 'express'
export default class MedicalReportController {

    getPatientMedicalReports(req: express.Request, res: express.Response) {
        let patientID = req.body.patient._id

        MedicalReportModel.find({ 'patient': patientID }).populate(['patient', 'doctor', {
            path: 'appointment', populate: {
                path: 'examination'
            }
        }]).then(medicalReports => {
            res.json(medicalReports)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    createMedicalReport(req: express.Request, res: express.Response) {
        let medicalReport = new MedicalReportModel(req.body)
        medicalReport.patient = req.body.patient._id
        medicalReport.doctor = req.body.doctor._id
        medicalReport.appointment = req.body.appointment._id

        medicalReport.save().then(() => {
            res.json({ 'message': 'success' })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }
}