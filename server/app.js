'use strict'
import 'app-module-path/register'
import express from 'express'
import setupServer from 'setup/server'
import setupModules from 'setup/modules'
import setupRoutes from 'setup/routes'
import setupMiddlewares from 'setup/middlewares'
import setupDatabase from 'setup/database'
import setupGraphQL from 'setup/graphql'

const app = express()
setupModules(app)
setupDatabase()
setupMiddlewares(app)
setupGraphQL(app)
setupRoutes(app)
setupServer(app)
