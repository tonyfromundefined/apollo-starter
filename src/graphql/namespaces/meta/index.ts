import { getVersion } from '../../../models'
import { MetaQueriesResolvers } from '../../generated/graphql'

export const MetaQueries: MetaQueriesResolvers = {
  version: () => getVersion(),
}

export * from './version'
