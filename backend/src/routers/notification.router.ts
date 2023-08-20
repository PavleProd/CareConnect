import express from 'express'
import { NotificationController } from '../controllers/notification.controller'

const notifcationRouter = express.Router()

notifcationRouter.route('/addPromotion').post(
    async (req, res) => await new NotificationController().addPromotion(req, res)
)

export default notifcationRouter