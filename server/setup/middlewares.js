import middlewareAuth from 'middlewares/authentication'

export default function (app) {
    app.use(middlewareAuth)
}