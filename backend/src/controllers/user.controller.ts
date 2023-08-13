import express from 'express';
import UserModel from '../models/user';

export class UserController {
    // get user by username and password
    get(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({ username: username, password: password }).then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    // add user to users collection
    add(req: express.Request, res: express.Response) {
        let user = new UserModel(req.body);

        user.save().then((user) => {
            res.json({ 'user': 'Added successfully' });
        }).catch((err) => {
            res.status(400).send('Failed to create new record');
        })
    }
}