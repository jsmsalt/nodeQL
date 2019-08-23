import express from 'express'
import config from 'config'
const router = express.Router()
router.use('/assets', express.static(config.get('spa.assets')))
router.get('/test', async (req, res, next) => {
    console.log(req.user)
    res.json({hola: 1})
})
router.get('*', async (req, res, next) => res.sendFile(config.get('spa.index')))
export default router