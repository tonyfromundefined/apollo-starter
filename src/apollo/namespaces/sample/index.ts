import { Task } from '~/entities/Task'
import { SampleMutationsResolvers, SampleQueriesResolvers } from '~/generated/graphql'

export * from './resolvers'

export const SampleQueries: SampleQueriesResolvers = {
  tasks: async (_parent, _args, context) => {
    const tasks = await context.store.find(Task)

    const endCursor: string | null = tasks.length ? String(tasks[tasks.length - 1].id) : null

    return {
      edges: tasks.map((task) => ({
        node: task,
        cursor: String(task.id),
      })),
      pageInfo: {
        endCursor,
        hasNextPage: true,
        hasPrevPage: true,
      },
    }
  },
}

export const SampleMutations: SampleMutationsResolvers = {
  createTask: async (_parent, args, context) => {
    const task = new Task()
    task.content = args.content

    return await context.store.save(task)
  },
}
