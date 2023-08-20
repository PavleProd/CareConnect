import express from 'express'
import AppointmentModel from '../models/appointment'
import ExaminationModel from '../models/examination'

export class AppointmentController {

    // dodavanje novog zakazivanja
    add(req: express.Request, res: express.Response) {
        let appointment = new AppointmentModel(req.body)
        appointment.save().then(appointment => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za pacijenta
    getByPatient(req: express.Request, res: express.Response) {
        let patient = req.params.patient
        AppointmentModel.find({ 'patient': patient }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za doktora
    getByDoctor(req: express.Request, res: express.Response) {
        let doctor = req.params.doctor
        AppointmentModel.find({ 'doctor': doctor }).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // proverava da li je doktor slobodan u odredjenom terminu
    async checkIfDoctorIsFree(req: express.Request, res: express.Response) {
        let doctorName = req.body.doctor
        let startDateTime = req.body.date
        let examinationDuration = req.body.duration // trajanje pregleda u minutima
        let examinationName = req.body.examination

        // 60000 da bi se konvertovalo iz milisekunde u minute
        let endDateTime = new Date(startDateTime.getTime() + examinationDuration * 60000)

        try {
            let appointments = await AppointmentModel.find({ 'doctor': doctorName })

            for (let appointment of appointments) {
                let appointmentStartDateTime = new Date(appointment.date)

                let examination = await ExaminationModel.findOne({ name: examinationName })

                let appointmentEndDateTime = new Date(appointment.date.getTime() + examination.duration * 60000)

                if (startDateTime >= appointmentStartDateTime && startDateTime <= appointmentEndDateTime) {
                    res.json({ 'available': false })
                }
                else if (endDateTime >= appointmentStartDateTime && endDateTime <= appointmentEndDateTime) {
                    res.json({ 'available': false })
                }
                else {
                    res.json({ 'available': true })
                }
            }
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        }

    }
}