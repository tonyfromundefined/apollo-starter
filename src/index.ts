import { createApp } from './app'

const isProd = process.env.NODE_ENV === 'production'
const port = isProd ? 80 : 2727

main()

async function main() {
  const app = await createApp()

  app.listen(port, () => {
    if (!isProd) {
      /* tslint:disable-next-line */
      console.log(`⚙️ Apollo Starter가 http://localhost:${port} 에서 작동중입니다`)
    }
  })
}
