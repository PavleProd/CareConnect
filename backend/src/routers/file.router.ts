import express from 'express'
import multer from 'multer'
import { FileController } from '../controllers/file.controller'
import * as fs from 'fs'
import jsPDF from 'jspdf'
import * as qr from 'qrcode';
import nodemailer from 'nodemailer'

const fileRouter = express.Router();
const profilePicturePath: string = 'assets/profile_pictures/'
const pdfFilePath: string = 'assets/'

const transporter = nodemailer.createTransport({
    service: 'Gmail',
    auth: {
        user: 'piaprojekat249@gmail.com',
        pass: 'nuudhjlbirqlmzqm'
    }
});

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

fileRouter.route('/exportToPDF').post((req, res) => {
    const doc = new jsPDF();

    doc.text(req.body.text, 10, 10);

    const pdfData = doc.output('arraybuffer');

    fs.writeFileSync(pdfFilePath + req.body.filePath, Buffer.from(pdfData));

    res.json({ success: true, message: 'PDF file generated and saved.' });
})

fileRouter.route('/generateQRCode').post((req, res) => {
    const linkToReport = req.body.link; // link do izveštaja
    const qrCodePath = req.body.qrCodePath; // putanja do QR koda
    qr.toFile(qrCodePath, linkToReport, {
        color: {
            dark: '#000',  // Boja tamnih piksela u QR kodu
            light: '#fff'  // Boja svetlih piksela u QR kodu
        }
    }, async (err) => {
        if (err) {
            console.error('Error generating QR code:', err);
            return res.status(500).json({ success: false, message: 'Error generating QR code' });
        }

        res.json({ success: true, message: 'QR code generated' });
    });
});

fileRouter.route('/sendMail').post((req, res) => {
    const { patientEmail, linkToReport, qrCodePath, qrCodeFileName } = req.body;

    const mailOptions = {
        from: 'piaprojekat249@gmail.com',
        to: patientEmail,
        subject: 'Vaš izveštaj',
        html: `
        <p>Ovde je link do vašeg izveštaja:</p>
        <a href="${linkToReport}">Link do izveštaja</a>
        <br>
        <img src="cid:qrcode" alt="QR kod">
      `,
        attachments: [{
            filename: qrCodeFileName,
            path: qrCodePath,
            cid: 'qrcode'
        }]
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).json({ success: false, message: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.json({ success: true, message: 'Email sent successfully' });
        }
    });
})


export default fileRouter;