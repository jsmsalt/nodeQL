import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'
import apicache from 'apicache'
import compression from 'compression'
import redis from 'lib/redis'

export default (app) => {
    const environment = process.env.NODE_ENV || 'development'
    
    let cache = apicache.options({
        debug: false,
        redisClient: redis,
        headers: {
            'cache-control': 'no-cache'
        },
        statusCodes: {
            include: [200],
        },
        appendKey: (req, res) => req.method + 'id'
    }).middleware
    
    app.set('trust proxy', 'loopback')
    app.use(cors())
    app.use(helmet())
    app.use(cookieParser())
    app.use(compression())
    app.use(bodyParser.json())
    app.use(bodyParser.urlencoded({ extended: true }))
    // app.use(cache('2 seconds'))

    if (environment === 'development') {
        app.use(morgan('tiny'))
    }
}