import express from 'express'
import SpecialityModel from '../models/speciality';

export class SpecialityController {
    get(req: express.Request, res: express.Response) {
        SpecialityModel.find({}).populate("examinations").then((specialities) => {
            res.send(specialities)
        }).catch((err) => {
            console.log(err)
        })
    }

    add(req: express.Request, res: express.Response) {
        let speciality = new SpecialityModel(req.body)
        speciality.save().then((speciality) => {
            res.send(speciality)
        }).catch((err) => {
            console.log(err)
        })
    }
}