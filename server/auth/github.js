import passport from 'passport'
import config from 'config'
import { Strategy as GitHubStrategy } from 'passport-github'
// var User = require('../models/User');

// passport.serializeUser(function (user, done) {
//     done(null, user)
// })

// passport.deserializeUser(function (id, done) {
//     // User.findById(id, function (err, user) {
//     //     done(err, user)
//     // })
//     done(null, id)
// })

passport.use(new GitHubStrategy(config.get('authentication.github'),
    (accessToken, refreshToken, profile, done) => {
        // console.log(accessToken)
        // console.log(refreshToken)
        // console.log(profile)
        // const Token = jwt.sign({
        //     _id: user._id,
        //     username: user.username,
        //     active: user.active,
        // }, config.security.secret)
        // return { token: Token }

        done(null, profile)
        // User.findOrCreate({name: profile.displayName}, {name: profile.displayName,userid: profile.id}, function(err, user) {
        //   if (err) { return done(err) }
        //   done(null, user)
        // })
    }
))

export default passport