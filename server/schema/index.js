import { join } from 'path'
import { fileLoader, mergeTypes, mergeResolvers } from 'merge-graphql-schemas'
import AuthDirective from 'schema/directives/auth'

const typesArray = fileLoader( join( __dirname, './types' ) )
export const typeDefs = mergeTypes(typesArray, { all: true })

const resolversArray = fileLoader( join( __dirname, './resolvers' ) )
export const resolvers = mergeResolvers(resolversArray)

export const schemaDirectives = {
    auth: AuthDirective
}