import mongoose from 'mongoose'
import config from 'config'

export default () => {
    const uri = config.get('mongodb.uri')

    if (uri) {
        const state = mongoose.connection.readyState
        if (state == 0 || state == 3) {
            const opt = {
                keepAlive: 1,
                autoIndex: config.get('mongodb.autoIndex'),
                useNewUrlParser: true,
                reconnectTries: 10,
                reconnectInterval: 2000
            }
            mongoose.connect(uri, opt)
            mongoose.connection.on('error', () => console.error('[mongoose] unable to connect to db.'))
            mongoose.connection.on('open', () => console.log('[mongoose] connected to db.'))
            if (process.env.NODE_ENV  === 'development') {
                mongoose.set('debug', (collName, method, query, doc) => console.log(query))
            }
            // mongoose.ObjectId.get(v => v.toString())
            mongoose.ObjectId.get(v => v == null ? v : v.toString())
        }
    }
}