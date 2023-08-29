import express from 'express'
import { NotificationController } from '../controllers/notification.controller'

const notificationRouter = express.Router()

notificationRouter.route('/addPromotion').post(
    async (req, res) => await new NotificationController().addPromotion(req, res)
)

notificationRouter.route('/addNotification').post(
    (req, res) => new NotificationController().addNotification(req, res)
)

notificationRouter.route('/setNotifications').post(
    (req, res) => new NotificationController().setNotifications(req, res)
)

export default notificationRouter