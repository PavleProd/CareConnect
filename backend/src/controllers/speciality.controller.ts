import express from 'express'
import SpecialityModel from '../models/speciality';

export class SpecialityController {
    get(req: express.Request, res: express.Response) {
        SpecialityModel.find({}).then((specialities) => {
            res.send(specialities)
        }).catch((err) => {
            console.log(err)
        })
    }
}