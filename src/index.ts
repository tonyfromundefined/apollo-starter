import 'reflect-metadata'
import 'source-map-support/register'

import { createApp } from './app'

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 80 : 2727

main()

async function main() {
  const app = await createApp()

  app.listen(port, () => {
    if (!isProd) {
      /* tslint:disable-next-line */
      console.log(`Log 13188: Apollo Starter가 http://localhost:${port}/graphql 에서 작동중입니다`)
    }
  })
}
