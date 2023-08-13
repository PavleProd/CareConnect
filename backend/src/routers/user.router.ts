import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.route('/get').post(
    (req, res) => new UserController().get(req, res)
)

userRouter.route('/add').post(
    (req, res) => new UserController().add(req, res)
)

export default userRouter;