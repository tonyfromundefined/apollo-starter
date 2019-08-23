import { ConnectionOptions } from 'typeorm'
import { Task } from './src/entities/Task'

const option: ConnectionOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'sampleuser',
  password: 'samplesecret',
  database: 'sampledb',
  synchronize: false,
  logging: true,
  migrationsRun: false,
  entities: [
    Task,
  ],
  migrations: [
    'dist/migrations/**/*.js',
    // 'src/migrations/**/*.ts',
  ],
  subscribers: [
    'src/subscribers/**/*.ts',
  ],
  cli: {
    entitiesDir: 'src/entities',
    migrationsDir: 'src/migrations',
    subscribersDir: 'src/subscribers',
  },
}

export = option
