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
            res.json({ 'user': true });
        }).catch((err) => {
            res.status(400).send('Failed to create new record');
        })
    }

    // check if username is unique
    checkUsername(req: express.Request, res: express.Response) {
        let username = req.body.username;

        UserModel.findOne({ 'username': username }).then((user) => {
            if (user) {
                res.json({ 'response': false });
            } else {
                res.json({ 'response': true });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'response': "error" });
        })
    }

    // check if email is unique
    checkEmail(req: express.Request, res: express.Response) {
        let email = req.body.email;

        UserModel.findOne({ 'email': email }).then((user) => {
            if (user) {
                res.json({ 'response': false });
            } else {
                res.json({ 'response': true });
            }
        }).catch((err) => {
            console.log(err);
            res.json({ 'response': "error" });
        })
    }
}