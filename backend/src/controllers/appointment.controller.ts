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

        appointment.save().then(appointment => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // brisanje zakazivanja
    delete(req: express.Request, res: express.Response) {
        let appointemntID = req.body.appointment._id

        AppointmentModel.deleteOne({ '_id': appointemntID }).then(() => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za pacijenta
    getByPatient(req: express.Request, res: express.Response) {
        let patientID = req.body.patient._id
        AppointmentModel.find({ 'patient': patientID }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za doktora
    getByDoctor(req: express.Request, res: express.Response) {
        let doctorID = req.body.doctor._id
        AppointmentModel.find({ 'doctor': doctorID }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // dohvatanje zakazivanja za doktora i pacijenta
    getByDoctorAndPatient(req: express.Request, res: express.Response) {
        let doctorID = req.body.doctor._id
        let patientID = req.body.patient._id

        AppointmentModel.find({ 'doctor': doctorID, 'patient': patientID }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            res.json(appointments)
        }).catch(err => {
            console.log(err)
            res.status(400).json({ 'message': 'error' })
        })
    }

    // proverava da li je doktor slobodan u odredjenom terminu tako sto prodjemo kroz sve zakazane preglede
    checkIfDoctorIsFree(req: express.Request, res: express.Response) {
        let doctorID = req.body.doctor._id
        let startDateTime: Date = new Date(req.body.date)
        let examinationDuration = req.body.duration // trajanje pregleda u minutima

        // 60000 da bi se konvertovalo iz milisekunde u minute
        let endDateTime = new Date(startDateTime.getTime() + examinationDuration * 60000)

        let appointments = AppointmentModel.find({ 'doctor': doctorID }).populate(['patient', 'doctor', 'examination']).then(appointments => {
            for (let appointment of appointments) {
                let appointmentStartDateTime = new Date(appointment.dateAndTime)

                let examination = appointment.examination as any
                let duration = examination.duration

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

        }).catch((err) => {
            console.log(err)
            res.json({ 'available': "ERROR" })
        })
    }


}