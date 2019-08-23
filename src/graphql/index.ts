import { ApolloServer } from 'apollo-server-express'
import { QueryResolvers } from './generated/graphql'
import * as Meta from './namespaces/meta'

import typeDefs from '~/graphql/index.graphql'

const introspection = !!Number(process.env.APOLLO_IS_INTROSPECTION_ENABLED || '0')
const tracing = !!Number(process.env.APOLLO_IS_TRACING_ENABLED || '0')

const Query: QueryResolvers = {
  meta: () => ({}),
}

export const apolloServer = new ApolloServer({
  typeDefs,
  resolvers: {
    Query,
    ...Meta,
  },
  introspection,
  playground: introspection,
  tracing,
})
