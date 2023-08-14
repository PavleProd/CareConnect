import express from 'express'

export class FileController {
    upload(req: express.Request, res: express.Response) {
        res.json({ message: 'ok' })
    }
}