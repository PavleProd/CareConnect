import FreeDaysModel from '../models/free_days';
import express from 'express'

export class FreeDaysController {

    // dodaje nove slobodne dane
    add(req: express.Request, res: express.Response) {
        let freeDays = new FreeDaysModel(req.body);
        freeDays.save().then((freeDays) => {
            res.json(freeDays);
        }).catch((err) => {
            console.log(err)
            res.status(400).json(err);
        });
    }

    // proverava da li je doktor slobodan u odredjenom vremenskom periodu
    checkIfDoctorIsFree(req: express.Request, res: express.Response) {
        let doctorID = req.body.doctor._id
        let startDateTime = new Date(req.body.date).getTime()
        let duration = req.body.duration // trajanje pregleda u minutima

        // 60000 da bi se konvertovalo iz milisekunde u minute
        let endDateTime = new Date(startDateTime + duration * 60000).getTime()

        FreeDaysModel.find({ 'doctor': doctorID }).populate(['doctor']).then(allFreeDays => {
            for (let freeDays of allFreeDays) {
                let begin = new Date(freeDays.begin).getTime()

                let end = new Date(freeDays.end).getTime()

                if (startDateTime >= begin && startDateTime <= end) {
                    res.json({ 'available': false })
                    return
                }
                else if (endDateTime >= begin && endDateTime <= end) {
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