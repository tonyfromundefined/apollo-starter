import express from 'express'
import { Connection } from 'typeorm'
import { createApolloServer } from '~/apollo'

export async function createApp(connection: Connection) {
  const app = express()

  const apolloServer = createApolloServer(connection)

  apolloServer.applyMiddleware({ app })

  return app
}
