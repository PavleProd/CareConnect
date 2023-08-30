import express from 'express'
import multer from 'multer'
import { FileController } from '../controllers/file.controller'
import * as fs from 'fs'
import jsPDF from 'jspdf'
import qr from 'qrcode'

const fileRouter = express.Router();
const profilePicturePath: string = 'assets/profile_pictures/'
const pdfFilePath: string = 'assets/'

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
    const linkToReport = 'http://localhost:4000/files/generated.pdf'; // Promenite na odgovarajući link

    qr.toFile('qrcode.png', linkToReport, {
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


export default fileRouter;