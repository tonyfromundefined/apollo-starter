import express from 'express'
import { Connection } from 'typeorm'
import { apolloServer } from './graphql'

export async function createApp(_connection: Connection) {
  const app = express()

  apolloServer.applyMiddleware({ app })

  return app
}
