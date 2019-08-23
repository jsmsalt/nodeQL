import routeReact from 'routes/react'
import routeUpload from 'routes/upload'

export default function (app) {
    app.use(routeUpload)
    app.use(routeReact)
}