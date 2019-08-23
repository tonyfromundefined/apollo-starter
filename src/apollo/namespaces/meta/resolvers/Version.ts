import { Stage, VersionResolvers } from '~/generated/graphql'

export const Version: VersionResolvers = {
  stage: () => {
    return Stage.Development
  },
}
