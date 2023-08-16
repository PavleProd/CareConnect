import express from 'express';
import UserModel from '../models/user';

export class UserController {
    // dohvati korisnika po username-u i sifri
    get(req: express.Request, res: express.Response) {
        let username = req.body.username;
        let password = req.body.password;

        UserModel.findOne({ username: username, password: password }).then((user) => {
            res.json(user);
        }).catch((err) => {
            console.log(err);
        })
    }

    // dohvati sve doktore koji sadrze u imenu, prezimenu ili specijalnosti zadati string
    getDoctors(req: express.Request, res: express.Response) {
        let name = req.body.name
        let surname = req.body.surname
        let speciality = req.body.speciality

        UserModel.find({
            'type': "Doctor", 'status': "Approved", 'name': { $regex: name, $options: 'i' },
            'surname': { $regex: surname, $options: 'i' }, 'speciality': { $regex: speciality, $options: 'i' }
        }).then((doctors) => {
            res.json(doctors);
        }).catch((err) => {
            console.log(err);
        })
    }

    // dodaj korisnika u kolekciju
    add(req: express.Request, res: express.Response) {
        let user = new UserModel(req.body);

        user.save().then((user) => {
            res.json({ 'user': true });
        }).catch((err) => {
            res.status(400).send('Failed to create new record');
        })
    }

    // proveri da li je username jedinstven
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

    // proveri da li je email jedinstven
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