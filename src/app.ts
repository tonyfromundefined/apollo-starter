import bodyParser from 'body-parser'
import cookieParser from 'cookie-parser'
import express from 'express'
import session from 'express-session'
import morgan from 'morgan'
import { createConnection } from 'typeorm'
import { createApolloServer } from '~/apollo'
import ormconfig from '../ormconfig'

export async function createApp() {
  const app = express()

  const connection = await createConnection({
    ...ormconfig,
  })

  const apolloServer = createApolloServer(connection)

  app.use(morgan('tiny'))

  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({
    extended: true,
  }))
  app.use(cookieParser())

  app.use(session({
    secret: 'OfV5lPNsPYatCGc2gCbFFLXiLKHaoI1ial1z6v9v',
    resave: false,
    saveUninitialized: true,
    cookie: {
      secure: false,
    },
  }))

  apolloServer.applyMiddleware({ app })

  return app
}
