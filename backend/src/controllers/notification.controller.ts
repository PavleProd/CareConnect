import express from 'express';
import UserModel from '../models/user';
import { Notification } from '../models/notification';

export class NotificationController {
    // dodaj promociju i posalji je svim korisnicima
    async addPromotion(req: express.Request, res: express.Response) {
        let notification = new Notification()
        notification.text = req.body.text
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
}