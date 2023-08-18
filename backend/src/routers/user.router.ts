import express from 'express'
import { UserController } from '../controllers/user.controller'

const userRouter = express.Router();

userRouter.route('/get').post(
    (req, res) => new UserController().get(req, res)
)

userRouter.route('/getDoctors').post(
    (req, res) => new UserController().getDoctors(req, res)
)

userRouter.route('/getPatients').post(
    (req, res) => new UserController().getPatients(req, res)
)

userRouter.route('/add').post(
    (req, res) => new UserController().add(req, res)
)

userRouter.route('/checkUsername').post(
    (req, res) => new UserController().checkUsername(req, res)
)

userRouter.route('/checkEmail').post(
    (req, res) => new UserController().checkEmail(req, res)
)

userRouter.route('/changePassword').post(
    (req, res) => new UserController().changePassword(req, res)
)

userRouter.route('/changeStatus').post(
    (req, res) => new UserController().changeStatus(req, res)
)

export default userRouter;