import express from 'express'
import jwt from 'jsonwebtoken'
import config from 'config'
import User from 'models/user'

import passportFacebook from 'auth/facebook'
import passportGoogle from 'auth/google'
import passportGithub from 'auth/github'

const router = express.Router();

const generateToken = (req, res) => {
    let auth = ''
    if (req.user) {

        User.findByProviderID(req.user.provider, req.user.id, function (err, user) {
            if (!err && !user) {
                let signup = new User({})
                signup.providers.push({
                    id: req.user.id,
                    name: req.user.provider,
                })
                signup.save()
            }
        })


        let userData = {
            id: req.user.id,
            provider: req.user.provider,
        }

        let accessToken = jwt.sign(userData, config.get('authentication.jwt.secret'))

        auth = JSON.stringify({
            token: accessToken,
            role: 'admin',
            user: {
                username: 'tito'
            }
        });
    }
    const tokenResponse = `<html>
            <head>
                <title>Authenticated</title>
            </head>
            <body>
                Authenticated successfully.
                <script type="text/javascript">
                window.opener.authCallback('${auth}');
                window.close();
                </script>
            </body>
        </html>`
    res.send(tokenResponse)
}

/* LOGIN ROUTER */
router.get('/login', function (req, res, next) {
    res.render('login', { title: 'Please Sign In with:' })
})

/* LOGOUT ROUTER */
router.get('/logout', function (req, res) {

    // Obtener session de express
    // let cookies = cookie.parse(req.headers.cookie)
    // let expressID = cookies['connect.sid']

    // if (expressID) {
    //     let sockets = filter(req.io.users, {
    //         userID: cookies['connect.sid']
    //     })

    //     sockets.forEach(socket => {
    //         req.io.to(socket.socketID).emit('logout')
    //     });
    // }

    // res.json({ ok: true })

    // req.logout()
    // res.redirect('/')
})


// Facebook
router.get('/facebook',
    passportFacebook.authenticate('facebook', { session: false, scope: ['email', 'default'] }))
router.get('/facebook/callback',
    passportFacebook.authenticate('facebook', { session: false }), generateToken)


// Google
router.get('/google',
    passportGoogle.authenticate('google', { session: false, scope: ['openid', 'profile', 'email'] }))
router.get('/google/callback',
    passportGoogle.authenticate('google', { session: false }), generateToken);


// Github
router.get('/github',
    passportGithub.authenticate('github', { session: false, scope: ['user'] }));
router.get('/github/callback',
    passportGithub.authenticate('github', { session: false }), generateToken);

export default router