declare namespace NodeJS {
  export interface ProcessEnv {
    NODE_ENV: 'development' | 'production'
    STAGE: 'development' | 'production'
    APOLLO_IS_INTROSPECTION_ENABLED: '0' | '1'
    APOLLO_IS_TRACING_ENABLED: '0' | '1'
  }
}
