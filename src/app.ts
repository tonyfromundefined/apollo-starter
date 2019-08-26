import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import { createConnection } from 'typeorm'
import { createApolloServer } from '~/apollo'
import ormconfig from '../ormconfig'

export async function createApp() {
  const app = new Koa()

  const connection = await createConnection({
    ...ormconfig,
  })

  const apolloServer = createApolloServer(connection)

  app.use(bodyParser())

  apolloServer.applyMiddleware({ app })

  return app
}
