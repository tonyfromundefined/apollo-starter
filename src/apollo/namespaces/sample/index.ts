import { Task } from '~/entities/Task'
import { SampleMutationsResolvers, SampleQueriesResolvers } from '~/generated/graphql'

export * from './resolvers'

export const SampleQueries: SampleQueriesResolvers = {
  tasks: (_parent, _args, context) => {
    return context.store.find(Task)
  },
}

export const SampleMutations: SampleMutationsResolvers = {
  createTask: async (_parent, args, context) => {
    const task = new Task()
    task.content = args.content

    return await context.store.save(task)
  },
}
