import { IStage, IVersionResolvers } from '../../../generated/graphql'

export const Version: IVersionResolvers = {
  stage: () => {
    return IStage.Development
  },
}
