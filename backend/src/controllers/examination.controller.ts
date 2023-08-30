import express from 'express'
import ExaminationModel from '../models/examination';
import SpecialityModel from '../models/speciality';

export class ExaminationController {

    // dodavanje novog pregleda. Potrebno je dodati i referencu u odgovarajucu specijalizaciju
    async add(req: express.Request, res: express.Response) {
        let examination = new ExaminationModel(req.body)

        try {
            await examination.save();
            let specialityName = req.body.speciality;
            let speciality = await SpecialityModel.findOne({ name: specialityName });
            speciality.examinations.push(examination._id);
            await speciality.save();
            res.json({ 'message': 'ok' })
        }
        catch (err) {
            console.log(err)
            res.json({ 'message': 'error' })
        }
    }

    // brisanje pregleda. Potrebno je izbrisati i referencu u odgovarajucoj specijalizaciji
    async delete(req: express.Request, res: express.Response) {
        let examinationName = req.body.examination
        let specialityName = req.body.speciality
        try {
            let examination = await ExaminationModel.findOneAndDelete({ name: examinationName })
            await SpecialityModel.findOneAndUpdate({ name: specialityName }, { $pull: { examinations: examination._id } })
            res.json({ 'message': 'ok' })
        }
        catch (err) {
            console.log(err)
            res.json({ 'message': 'error' })
        }
    }

    // menjanje statusa pregleda
    changeStatus(req: express.Request, res: express.Response) {
        let examinationName = req.body.examination
        let status = req.body.status

        ExaminationModel.findOneAndUpdate({ name: examinationName }, { status: status }).then((resp) => {
            res.json({ 'message': 'ok' })
        }).catch((err) => {
            console.log(err)
            res.json({ 'message': 'error' })
        })
    }

    changeExamination(req: express.Request, res: express.Response) {
        let examination = req.body.examination

        ExaminationModel.findOneAndUpdate({ name: examination.name }, { name: examination.name, duration: examination.duration, price: examination.price }).then((resp) => {
            res.json({ 'message': 'ok' })
        }).catch((err) => {
            console.log(err)
            res.json({ 'message': 'error' })
        })
    }
}