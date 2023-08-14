import express from 'express'
import multer from 'multer'
import { FileController } from '../controllers/file.controller'

const fileRouter = express.Router();
const profilePicturePath: string = 'assets/profile_pictures/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, profilePicturePath)
    },
    filename: (req, file, cb) => {
        const username = req.body.username
        const fileName = username + '.' + file.originalname.split('.')[1]
        cb(null, fileName)
    }
})

const upload = multer({ storage: storage })

fileRouter.route('/upload').post(upload.single('file'),
    (req, res) => new FileController().upload(req, res)
)

export default fileRouter;