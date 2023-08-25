import express from 'express'
import AppointmentModel from '../models/appointment'
import ExaminationModel from '../models/examination'

export class AppointmentController {

    // dodavanje novog zakazivanja i prosledjivanje reference na pacijenta, doktora i pregled
    add(req: express.Request, res: express.Response) {
        let appointment = new AppointmentModel()
        appointment.dateAndTime = req.body.dateAndTime
        appointment.examination = req.body.examination._id
        appointment.doctor = req.body.doctor._id
        appointment.patient = req.body.patient._id
        appointment.status = 'Pending'

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
        AppointmentModel.find({ 'patient': patient }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za doktora
    getByDoctor(req: express.Request, res: express.Response) {
        let doctor = req.params.doctor
        AppointmentModel.find({ 'doctor': doctor }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // proverava da li je doktor slobodan u odredjenom terminu
    async checkIfDoctorIsFree(req: express.Request, res: express.Response) {
        let doctorName = req.body.doctor
        let startDateTime: Date = new Date(req.body.date)
        let examinationDuration = req.body.duration // trajanje pregleda u minutima
        let examinationName = req.body.examinationName

        // 60000 da bi se konvertovalo iz milisekunde u minute
        let endDateTime = new Date(startDateTime.getTime() + examinationDuration * 60000)

        try {
            let appointments = await AppointmentModel.find({ 'doctor': doctorName }).populate(['patient', 'doctor', 'examination'])

            for (let appointment of appointments) {
                let appointmentStartDateTime = new Date(appointment.dateAndTime)

                let duration = 0
                if (appointment.examination && appointment.examination.duration) {
                    duration = appointment.examination.duration;
                }

                let appointmentEndDateTime = new Date(appointment.dateAndTime.getTime() + duration * 60000)

                if (startDateTime >= appointmentStartDateTime && startDateTime <= appointmentEndDateTime) {
                    res.json({ 'available': false })
                    return
                }
                else if (endDateTime >= appointmentStartDateTime && endDateTime <= appointmentEndDateTime) {
                    res.json({ 'available': false })
                    return
                }
            }

            res.json({ 'available': true })
        }
        catch (err) {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        }

    }
}