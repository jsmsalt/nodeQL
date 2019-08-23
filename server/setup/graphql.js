import { typeDefs, resolvers, schemaDirectives } from 'schema'
import { ApolloServer } from 'apollo-server-express'
import { RedisCache } from 'apollo-server-redis'
import depthLimit from 'graphql-depth-limit'
import config from 'config'

export default (app) => {
    const apollo = new ApolloServer({
        debug: false,
        introspection: false,
        playground: false,
        typeDefs,
        resolvers,
        schemaDirectives,
        validationRules: [depthLimit(3)],
        tracing: true,
        cacheControl: {
          defaultMaxAge: 5,
          stripFormattedExtensions: false,
          calculateCacheControlHeaders: false,
        },
        cache: new RedisCache({
          host: config.get('redis.host'),
          port: config.get('redis.port')
        }),
        context: ({ req }) => {
            return {
              req: req
            }
          },
    });

    apollo.applyMiddleware({ app, path: '/graphql' });
}