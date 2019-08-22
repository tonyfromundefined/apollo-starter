import { getVersion } from '../../../models'
import { IMetaQueriesResolvers } from '../../generated/graphql'

export const MetaQueries: IMetaQueriesResolvers = {
  version: () => getVersion(),
}

export * from './version'
