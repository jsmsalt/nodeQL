import passportJWT from 'auth/jwt'

export default function (req, res, next) {
    passportJWT.authenticate('jwt', { session: false }, async (err, user, info) => {
        if (user) {
            req.user = user
        } else {
            req.user = {}
        }
        return next()
    })(req, res, next)
}