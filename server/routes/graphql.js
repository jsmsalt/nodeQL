import express from 'express'
import config from 'config'
import graphQL from 'express-graphql'
import schema from 'schema'

const router = express.Router()

router.use(config.get('graphql.endpoint'), graphQL(() => ({
    schema,
    graphiql: process.env.NODE_ENV === 'development',
    context: (req) => {user: req.user},
})))

export default router