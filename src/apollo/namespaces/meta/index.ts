import { MetaQueriesResolvers } from '~/generated/graphql'
import { getVersion } from '~/utils'

export * from './resolvers'

export const MetaQueries: MetaQueriesResolvers = {
  version: () => getVersion(),
}
