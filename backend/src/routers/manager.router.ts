import express from 'express'
import { ManagerController } from '../controllers/manager.controller'

const managerRouter = express.Router();

managerRouter.route('/get').post(
    (req, res) => new ManagerController().get(req, res)
);

export default managerRouter;