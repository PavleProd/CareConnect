import express from 'express';
import cors from 'cors'
import mongoose from 'mongoose';
import userRouter from './routers/user.router';
import fileRouter from './routers/file.router';
import managerRouter from './routers/manager.router';
import examinationRouter from './routers/examination.router';
import specialityRouter from './routers/speciality.router';
import notificationRouter from './routers/notification.router';
import appointmentRouter from './routers/appointment.router';
import medicalReportRouter from './routers/medical_report.router';
import freeDaysRouter from './routers/free_days.router';

const assetsPath: string = './assets/'

mongoose.set('strictQuery', false);

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(assetsPath))

mongoose.connect('mongodb://127.0.0.1:27017/CareConnect')
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("MongoDB database connection established successfully");
})

const router = express.Router();

router.use('/users', userRouter)
router.use('/files', fileRouter)
router.use('/managers', managerRouter)
router.use('/examinations', examinationRouter)
router.use('/specialities', specialityRouter)
router.use('/notifications', notificationRouter)
router.use('/appointments', appointmentRouter)
router.use('/medicalReports', medicalReportRouter)
router.use('/freeDays', freeDaysRouter)



app.use('/', router);

app.listen(4000, () => console.log(`Express server running on port 4000`));