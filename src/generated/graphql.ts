import { GraphQLResolveInfo } from 'graphql';
import { Version } from '~/utils/version';
import { Task } from '~/entities/Task';
import { Context } from '~/apollo';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
export type RequireFields<T, K extends keyof T> = { [X in Exclude<keyof T, K>]?: T[X] } & { [P in K]-?: NonNullable<T[P]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type MetaQueries = {
  __typename?: 'MetaQueries',
  version: Version,
};

export type Mutation = {
  __typename?: 'Mutation',
  sample: SampleMutations,
};

export type PageInfo = {
  __typename?: 'PageInfo',
  endCursor?: Maybe<Scalars['String']>,
  hasNextPage: Scalars['Boolean'],
  hasPrevPage: Scalars['Boolean'],
};

export type Query = {
  __typename?: 'Query',
  meta: MetaQueries,
  sample: SampleQueries,
};

export type SampleMutations = {
  __typename?: 'SampleMutations',
  createTask: Task,
};


export type SampleMutationsCreateTaskArgs = {
  content: Scalars['String']
};

export type SampleQueries = {
  __typename?: 'SampleQueries',
  tasks: TaskConnection,
};

export enum Stage {
  Development = 'Development',
  Production = 'Production'
}

export type Task = {
  __typename?: 'Task',
  id: Scalars['ID'],
  content: Scalars['String'],
};

export type TaskConnection = {
  __typename?: 'TaskConnection',
  edges: Array<TaskEdge>,
  pageInfo: PageInfo,
};

export type TaskEdge = {
  __typename?: 'TaskEdge',
  node: Task,
  cursor: Scalars['String'],
};

export type Version = {
  __typename?: 'Version',
  stage: Stage,
  shortHash: Scalars['String'],
  hash: Scalars['String'],
  committedOn: Scalars['String'],
};
export type WithIndex<TObject> = TObject & Record<string, any>;
export type ResolversObject<TObject> = WithIndex<TObject>;

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;


export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionSubscriberObject<TResult, TKey extends string, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<{ [key in TKey]: TResult }, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, { [key in TKey]: TResult }, TContext, TArgs>;
}

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<any, TParent, TContext, TArgs>;
  resolve: SubscriptionResolveFn<TResult, any, TContext, TArgs>;
}

export type SubscriptionObject<TResult, TKey extends string, TParent, TContext, TArgs> =
  | SubscriptionSubscriberObject<TResult, TKey, TParent, TContext, TArgs>
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type SubscriptionResolver<TResult, TKey extends string, TParent = {}, TContext = {}, TArgs = {}> =
  | ((...args: any[]) => SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>)
  | SubscriptionObject<TResult, TKey, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult = {}, TParent = {}, TContext = {}, TArgs = {}> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  MetaQueries: ResolverTypeWrapper<Omit<MetaQueries, 'version'> & { version: ResolversTypes['Version'] }>,
  Version: ResolverTypeWrapper<Version>,
  Stage: Stage,
  String: ResolverTypeWrapper<Scalars['String']>,
  SampleQueries: ResolverTypeWrapper<Omit<SampleQueries, 'tasks'> & { tasks: ResolversTypes['TaskConnection'] }>,
  TaskConnection: ResolverTypeWrapper<Omit<TaskConnection, 'edges'> & { edges: Array<ResolversTypes['TaskEdge']> }>,
  TaskEdge: ResolverTypeWrapper<Omit<TaskEdge, 'node'> & { node: ResolversTypes['Task'] }>,
  Task: ResolverTypeWrapper<Task>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  PageInfo: ResolverTypeWrapper<PageInfo>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
  Mutation: ResolverTypeWrapper<{}>,
  SampleMutations: ResolverTypeWrapper<Omit<SampleMutations, 'createTask'> & { createTask: ResolversTypes['Task'] }>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  MetaQueries: Omit<MetaQueries, 'version'> & { version: ResolversTypes['Version'] },
  Version: Version,
  Stage: Stage,
  String: Scalars['String'],
  SampleQueries: Omit<SampleQueries, 'tasks'> & { tasks: ResolversTypes['TaskConnection'] },
  TaskConnection: Omit<TaskConnection, 'edges'> & { edges: Array<ResolversTypes['TaskEdge']> },
  TaskEdge: Omit<TaskEdge, 'node'> & { node: ResolversTypes['Task'] },
  Task: Task,
  ID: Scalars['ID'],
  PageInfo: PageInfo,
  Boolean: Scalars['Boolean'],
  Mutation: {},
  SampleMutations: Omit<SampleMutations, 'createTask'> & { createTask: ResolversTypes['Task'] },
}>;

export type MetaQueriesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MetaQueries'] = ResolversParentTypes['MetaQueries']> = ResolversObject<{
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  sample?: Resolver<ResolversTypes['SampleMutations'], ParentType, ContextType>,
}>;

export type PageInfoResolvers<ContextType = Context, ParentType extends ResolversParentTypes['PageInfo'] = ResolversParentTypes['PageInfo']> = ResolversObject<{
  endCursor?: Resolver<Maybe<ResolversTypes['String']>, ParentType, ContextType>,
  hasNextPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
  hasPrevPage?: Resolver<ResolversTypes['Boolean'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  meta?: Resolver<ResolversTypes['MetaQueries'], ParentType, ContextType>,
  sample?: Resolver<ResolversTypes['SampleQueries'], ParentType, ContextType>,
}>;

export type SampleMutationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SampleMutations'] = ResolversParentTypes['SampleMutations']> = ResolversObject<{
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<SampleMutationsCreateTaskArgs, 'content'>>,
}>;

export type SampleQueriesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SampleQueries'] = ResolversParentTypes['SampleQueries']> = ResolversObject<{
  tasks?: Resolver<ResolversTypes['TaskConnection'], ParentType, ContextType>,
}>;

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type TaskConnectionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaskConnection'] = ResolversParentTypes['TaskConnection']> = ResolversObject<{
  edges?: Resolver<Array<ResolversTypes['TaskEdge']>, ParentType, ContextType>,
  pageInfo?: Resolver<ResolversTypes['PageInfo'], ParentType, ContextType>,
}>;

export type TaskEdgeResolvers<ContextType = Context, ParentType extends ResolversParentTypes['TaskEdge'] = ResolversParentTypes['TaskEdge']> = ResolversObject<{
  node?: Resolver<ResolversTypes['Task'], ParentType, ContextType>,
  cursor?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type VersionResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Version'] = ResolversParentTypes['Version']> = ResolversObject<{
  stage?: Resolver<ResolversTypes['Stage'], ParentType, ContextType>,
  shortHash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  hash?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
  committedOn?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
}>;

export type Resolvers<ContextType = Context> = ResolversObject<{
  MetaQueries?: MetaQueriesResolvers<ContextType>,
  Mutation?: MutationResolvers<ContextType>,
  PageInfo?: PageInfoResolvers<ContextType>,
  Query?: QueryResolvers<ContextType>,
  SampleMutations?: SampleMutationsResolvers<ContextType>,
  SampleQueries?: SampleQueriesResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  TaskConnection?: TaskConnectionResolvers<ContextType>,
  TaskEdge?: TaskEdgeResolvers<ContextType>,
  Version?: VersionResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
