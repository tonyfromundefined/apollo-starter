export interface IModelVersion {
  stage: 'development' | 'production'
}

export function getVersion(): IModelVersion {
  return {
    stage: process.env.STAGE,
  }
}
