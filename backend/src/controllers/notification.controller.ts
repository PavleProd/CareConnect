import express from 'express';
import UserModel from '../models/user';
import { Notification } from '../models/notification';

export class NotificationController {
    // dodaj promociju i posalji je svim korisnicima
    async addPromotion(req: express.Request, res: express.Response) {
        let notification = new Notification()
        notification.text = "PROMOCIJA: " + req.body.text
        notification.read = false
        try {
            await UserModel.updateMany({ 'type': "Patient" }, { $push: { 'notifications': notification } })

            res.json({ 'message': 'ok' })
        }
        catch (err) {
            console.log(err)
            res.json({ 'message': 'error' })
        }
    }

    // dodaje notifikaciju za odredjenog pacijenta
    async addNotification(req: express.Request, res: express.Response) {
        let prefix = req.body.prefix
        let notification = new Notification()
        notification.text = prefix + " " + req.body.text
        notification.read = false
        let patientID = req.body.patient._id

        UserModel.updateOne({ '_id': patientID }, { $push: { 'notifications': notification } }).then(() => {
            res.json({ 'message': 'ok' })
        }
        ).catch(err => {
            console.log(err)
            res.json({ 'message': 'error' })
        })
    }

    // postavlja notifikacije za odredjenog pacijenta, koristi se kada pacijent procita notifikacije
    async setNotifications(req: express.Request, res: express.Response) {
        let notifications = req.body.notifications
        let patientID = req.body.patient._id

        UserModel.updateOne({ '_id': patientID }, { $set: { 'notifications': notifications } }).then(() => {
            res.json({ 'message': 'ok' })
        }).catch(err => {
            console.log(err)
            res.json({ 'message': 'error' })
        })
    }
}