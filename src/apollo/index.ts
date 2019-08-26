import { ApolloServer } from 'apollo-server-koa'
import { IncomingMessage, ServerResponse } from 'http'
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
  req: IncomingMessage
  res: ServerResponse
  store: EntityManager
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
    context: ({ ctx }) => ({
      req: ctx.req,
      res: ctx.res,
      store: connection.manager,
    } as Context),
  })
}
