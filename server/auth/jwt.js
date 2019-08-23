import passport from 'passport'
import { Strategy as JwtStrategy } from 'passport-jwt'
import { ExtractJwt } from 'passport-jwt'
import config from 'config'
// import redis from 'lib/redis'
// import User from 'models/user'

passport.use(new JwtStrategy({
    secretOrKey: config.get('authentication.jwt.secret'),
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()
}, async (payload, done) => {
    try {
        // // Check if already verified
        // if (payload._id && db().Types.ObjectId.isValid(payload._id.toString())) {
        //     let cachedUser = await redis.get(`${payload._id}_auth`)
        //     if (cachedUser != null) {
        //         cachedUser = JSON.parse(cachedUser)
        //         if (cachedUser.active) {
        //             return done(null, cachedUser, 'AUTHORIZED')
        //         } else {
        //             return done(null, false, 'INACTIVE')
        //         }
        //     } else {
        //         // Check database
        //         const userFind = await User.findById(payload._id)

        //         if (userFind) {
        //             const user = {
        //                 _id: userFind._id,
        //                 username: userFind.username,
        //                 active: userFind.active,
        //             }
        //             await redis.set(`${user._id}_auth`, JSON.stringify(user), 'EX', 10)
        //             return done(null, user, 'AUTHORIZED')
        //         }
        //     }
        // }

        const user = {
            _id: 34,
            username: "userername",
            active: true,
        }
        return done(null, user, 'AUTHORIZED')

        return done(null, false, 'UNAUTHORIZED')
    } catch (error) {
        return done(null, false, 'UNKNOWN')
    }
}))

export default passport