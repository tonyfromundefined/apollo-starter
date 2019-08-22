import { ApolloServer } from 'apollo-server-express'

const introspection = !!Number(process.env.APOLLO_IS_INTROSPECTION_ENABLED || '0')
const tracing = !!Number(process.env.APOLLO_IS_TRACING_ENABLED || '0')

export const apolloServer = new ApolloServer({
  introspection,
  playground: introspection,
  tracing,
})
