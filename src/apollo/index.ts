import { ApolloServer } from 'apollo-server-express'
import { Request, Response } from 'express-serve-static-core'
import { Connection, EntityManager } from 'typeorm'
import { MutationResolvers, QueryResolvers } from '~/generated/graphql'
import * as Meta from './namespaces/meta'
import * as Sample from './namespaces/sample'

import typeDefs from './schema.graphql'

const introspection = !!Number(process.env.APOLLO_IS_INTROSPECTION_ENABLED || '0')
const tracing = !!Number(process.env.APOLLO_IS_TRACING_ENABLED || '0')

const Query: QueryResolvers = {
  meta: () => ({} as any),
  sample: () => ({} as any),
}

const Mutation: MutationResolvers = {
  sample: () => ({} as any),
}

export interface Context {
  store: EntityManager
  req: Request
  res: Response
}

export function createApolloServer(connection: Connection) {
  return new ApolloServer({
    typeDefs,
    resolvers: {
      Query,
      Mutation,
      ...Meta,
      ...Sample,
    },
    introspection,
    playground: introspection,
    tracing,
    context: ({ req, res }) => ({
      store: connection.manager,
      req,
      res,
    } as Context),
  })
}
