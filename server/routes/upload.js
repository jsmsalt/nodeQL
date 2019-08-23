import express from 'express'
import path from 'path'
import multer from 'multer'
import config from 'config'

const router = express.Router()

const storage = multer.diskStorage({
    destination: config.get('upload'),
    filename: function (request, file, callback) {
        callback(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
    }
})

const upload = multer({
    storage: storage
}).single('file')

router.post('/upload', async (req, res) => {
    upload(req, res, function (error) {
        if (!error) {
            res.json({
                success: true,
                file: req.file.filename
            })
        } else {
            res.json({
                success: false,
                file: null
            })
        }
    })
})

export default router