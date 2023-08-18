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
        let department = req.body.department

        UserModel.find({
            'type': "Doctor", 'name': { $regex: name, $options: 'i' },
            'surname': { $regex: surname, $options: 'i' }, 'speciality': { $regex: speciality, $options: 'i' }, 'department': { $regex: department, $options: 'i' }
        }).then((doctors) => {
            res.json(doctors);
        }).catch((err) => {
            console.log(err);
        })
    }

    // dohvati sve pacijente po statusu
    getPatients(req: express.Request, res: express.Response) {
        let status = req.body.status

        UserModel.find({ 'type': "Patient", 'status': status }).then((patients) => {
            res.json(patients);
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
            console.log(err)
            res.json({ 'user': false });
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

    // promeni lozinku
    changePassword(req: express.Request, res: express.Response) {
        let username = req.body.username
        let password = req.body.password

        UserModel.updateOne({ 'username': username }, { $set: { 'password': password } }).then((user) => {
            res.json({ 'response': true });
        }).catch((err) => {
            console.log(err);
            res.json({ 'response': false });
        })
    }

    // promeni status korisnika
    changeStatus(req: express.Request, res: express.Response) {
        let username = req.body.username
        let status = req.body.status

        UserModel.updateOne({ 'username': username }, { $set: { 'status': status } }).then((user) => {
            res.json({ 'response': true });
        }
        ).catch((err) => {
            console.log(err);
            res.json({ 'response': false });
        })
    }
}