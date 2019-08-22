import express from 'express'
import { apolloServer } from './graphql'

export async function createApp() {
  const app = express()

  apolloServer.applyMiddleware({ app })

  return app
}
