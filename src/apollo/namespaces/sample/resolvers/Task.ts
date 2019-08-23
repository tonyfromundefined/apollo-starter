import { TaskResolvers } from '~/generated/graphql'

export const Task: TaskResolvers = {
  id: (parent) => {
    return String(parent.id)
  },
  content: (parent) => {
    return parent.content
  },
}
