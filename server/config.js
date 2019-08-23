import { join } from 'path'
import convict from 'convict'

export default convict({
    http: {
        port: {
            default: 3333
        },
        host: {
            default: "localhost"
        },
        protocol: {
            default: "http"
        },
    },
    upload: {
        default: join(__dirname, '..', 'client', 'public', 'assets')
    },
    spa: {
        index: {
            default: join(__dirname, '..', 'client', 'public', 'index.html')
        },
        assets: {
            default: join(__dirname, '..', 'client', 'public', 'assets')
        },
    },
    graphql: {
        endpoint: {
            default: "/api"
        },
        ide: {
            default: true
        },
        pretty: {
            default: true
        },
        maxFileSize: {
            default: 10 * 1000 * 1000
        },
        maxFiles: {
            default: 1
        },
        graphqlDeep: {
            default: 10
        },
        graphqlCost: {
            default: 1000
        }
    },        
    redis: {
        default: {
            port: 6379,
            host: 'redis',
            family: 4,
            password: '',
            db: 0
        }
    },
    mongodb: {
        default: {
            uri: 'mongodb://mongo:27017/app',
            autoIndex: false
        }
    },
    authentication: {
        facebook: {
            default: {
                clientID: "",
                clientSecret: "",
                callbackURL: "http://localhost:3333/auth/facebook/callback"
            }
        },
        google: {
            default: {
                clientID: "",
                clientSecret: "",
                callbackURL: "http://localhost:3333/auth/google/callback"
            }
        },
        github: {
            default: {
                clientID: "",
                clientSecret: "",
                callbackURL: "http://localhost:3333/auth/github/callback"
            }
        },
        jwt: {
            secret: {
                default: '_12345_',
            },
            issuer: {
                default: 'social-logins-spa'
            },
            audience: {
                default: 'social-logins-spa'
            }
        }
    }
})
