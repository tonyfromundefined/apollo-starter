import { promisify } from 'es6-promisify'
import { Commit, getLastCommit } from 'git-last-commit'

export interface IModelVersion extends Commit {
  stage: 'development' | 'production'
  committedOn: string
}

export async function getVersion(): Promise<IModelVersion> {
  const commit = await promisify(getLastCommit)()

  const committedOn = new Date(Number(commit.committedOn) * 1000).toISOString()

  return {
    ...commit,
    stage: process.env.STAGE,
    committedOn,
  }
}
