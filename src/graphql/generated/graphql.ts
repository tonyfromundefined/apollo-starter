import { GraphQLResolveInfo } from 'graphql';
import { IModelVersion } from '../../models/version';
export type Maybe<T> = T | null;
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string,
  String: string,
  Boolean: boolean,
  Int: number,
  Float: number,
};

export type IMetaQueries = {
  __typename?: 'MetaQueries',
  version: IVersion,
};

export type IQuery = {
  __typename?: 'Query',
  meta: IMetaQueries,
};

export enum IStage {
  Development = 'DEVELOPMENT',
  Production = 'PRODUCTION'
}

export type IVersion = {
  __typename?: 'Version',
  stage: IStage,
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
export type IResolversTypes = ResolversObject<{
  Query: ResolverTypeWrapper<{}>,
  MetaQueries: ResolverTypeWrapper<Partial<Omit<IMetaQueries, 'version'> & { version: IResolversTypes['Version'] }>>,
  Version: ResolverTypeWrapper<IModelVersion>,
  Stage: ResolverTypeWrapper<Partial<IStage>>,
  String: ResolverTypeWrapper<Partial<Scalars['String']>>,
  Boolean: ResolverTypeWrapper<Partial<Scalars['Boolean']>>,
}>;

/** Mapping between all available schema types and the resolvers parents */
export type IResolversParentTypes = ResolversObject<{
  Query: {},
  MetaQueries: Partial<Omit<IMetaQueries, 'version'> & { version: IResolversTypes['Version'] }>,
  Version: IModelVersion,
  Stage: Partial<IStage>,
  String: Partial<Scalars['String']>,
  Boolean: Partial<Scalars['Boolean']>,
}>;

export type IMetaQueriesResolvers<ContextType = any, ParentType extends IResolversParentTypes['MetaQueries'] = IResolversParentTypes['MetaQueries']> = ResolversObject<{
  version?: Resolver<IResolversTypes['Version'], ParentType, ContextType>,
}>;

export type IQueryResolvers<ContextType = any, ParentType extends IResolversParentTypes['Query'] = IResolversParentTypes['Query']> = ResolversObject<{
  meta?: Resolver<IResolversTypes['MetaQueries'], ParentType, ContextType>,
}>;

export type IVersionResolvers<ContextType = any, ParentType extends IResolversParentTypes['Version'] = IResolversParentTypes['Version']> = ResolversObject<{
  stage?: Resolver<IResolversTypes['Stage'], ParentType, ContextType>,
}>;

export type IResolvers<ContextType = any> = ResolversObject<{
  MetaQueries?: IMetaQueriesResolvers<ContextType>,
  Query?: IQueryResolvers<ContextType>,
  Version?: IVersionResolvers<ContextType>,
}>;


