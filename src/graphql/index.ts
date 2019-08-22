import { ApolloServer } from 'apollo-server-express'
import { importSchema } from 'graphql-import'
import path from 'path'
import { QueryResolvers } from './generated/graphql'
import * as Meta from './namespaces/meta'

const introspection = !!Number(process.env.APOLLO_IS_INTROSPECTION_ENABLED || '0')
const tracing = !!Number(process.env.APOLLO_IS_TRACING_ENABLED || '0')

const typeDefs = importSchema(path.resolve(__dirname, './generated/schema.graphql'))

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
