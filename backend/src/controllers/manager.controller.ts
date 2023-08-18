import express from 'express'
import ManagerModel from '../models/manager'

export class ManagerController {
    // dohvati menadzera sa datim username-om i password-om
    get(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let password = req.body.password;

        ManagerModel.findOne({ 'username': username, 'password': password }).then((manager) => {
            res.json(manager);
        }).catch((err) => {
            console.log(err);
        })
    }
}