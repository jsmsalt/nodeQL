import redis from 'redis'
import config from 'config'

export default redis.createClient({
    host: config.get('redis.host'),
    port: config.get('redis.port')
})