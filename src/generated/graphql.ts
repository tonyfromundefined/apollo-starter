import { GraphQLResolveInfo } from 'graphql';
import { ModelVersion } from '~/utils/version';
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
  tasks: Array<Task>,
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
  Version: ResolverTypeWrapper<ModelVersion>,
  Stage: Stage,
  String: ResolverTypeWrapper<Scalars['String']>,
  SampleQueries: ResolverTypeWrapper<Omit<SampleQueries, 'tasks'> & { tasks: Array<ResolversTypes['Task']> }>,
  Task: ResolverTypeWrapper<Task>,
  ID: ResolverTypeWrapper<Scalars['ID']>,
  Mutation: ResolverTypeWrapper<{}>,
  SampleMutations: ResolverTypeWrapper<Omit<SampleMutations, 'createTask'> & { createTask: ResolversTypes['Task'] }>,
  Boolean: ResolverTypeWrapper<Scalars['Boolean']>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = ResolversObject<{
  Query: {},
  MetaQueries: Omit<MetaQueries, 'version'> & { version: ResolversTypes['Version'] },
  Version: ModelVersion,
  Stage: Stage,
  String: Scalars['String'],
  SampleQueries: Omit<SampleQueries, 'tasks'> & { tasks: Array<ResolversTypes['Task']> },
  Task: Task,
  ID: Scalars['ID'],
  Mutation: {},
  SampleMutations: Omit<SampleMutations, 'createTask'> & { createTask: ResolversTypes['Task'] },
  Boolean: Scalars['Boolean'],
}>;

export type MetaQueriesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['MetaQueries'] = ResolversParentTypes['MetaQueries']> = ResolversObject<{
  version?: Resolver<ResolversTypes['Version'], ParentType, ContextType>,
}>;

export type MutationResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Mutation'] = ResolversParentTypes['Mutation']> = ResolversObject<{
  sample?: Resolver<ResolversTypes['SampleMutations'], ParentType, ContextType>,
}>;

export type QueryResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Query'] = ResolversParentTypes['Query']> = ResolversObject<{
  meta?: Resolver<ResolversTypes['MetaQueries'], ParentType, ContextType>,
  sample?: Resolver<ResolversTypes['SampleQueries'], ParentType, ContextType>,
}>;

export type SampleMutationsResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SampleMutations'] = ResolversParentTypes['SampleMutations']> = ResolversObject<{
  createTask?: Resolver<ResolversTypes['Task'], ParentType, ContextType, RequireFields<SampleMutationsCreateTaskArgs, 'content'>>,
}>;

export type SampleQueriesResolvers<ContextType = Context, ParentType extends ResolversParentTypes['SampleQueries'] = ResolversParentTypes['SampleQueries']> = ResolversObject<{
  tasks?: Resolver<Array<ResolversTypes['Task']>, ParentType, ContextType>,
}>;

export type TaskResolvers<ContextType = Context, ParentType extends ResolversParentTypes['Task'] = ResolversParentTypes['Task']> = ResolversObject<{
  id?: Resolver<ResolversTypes['ID'], ParentType, ContextType>,
  content?: Resolver<ResolversTypes['String'], ParentType, ContextType>,
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
  Query?: QueryResolvers<ContextType>,
  SampleMutations?: SampleMutationsResolvers<ContextType>,
  SampleQueries?: SampleQueriesResolvers<ContextType>,
  Task?: TaskResolvers<ContextType>,
  Version?: VersionResolvers<ContextType>,
}>;


/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
*/
export type IResolvers<ContextType = Context> = Resolvers<ContextType>;
