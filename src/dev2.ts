// @ts-check
import express, { Express } from "express"
import { createRsbuild, loadConfig, logger } from "@rsbuild/core"

export async function startDevServer() {
  const app = express()

  const { content } = await loadConfig({})

  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  })

  const rsbuildServer = await rsbuild.createDevServer()

  const server: Express = await rsbuildServer.environments.server.loadBundle(
    "index"
  )

  app.use("/", (req, res, next) => {
    try {
      server(req, res, next)
    } catch (error) {
      logger.error("SSR render error, downgrade to CSR...\n", error)
      next()
    }
  })

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares)

  const httpServer = app.listen(rsbuildServer.port, () => {
    rsbuildServer.afterListen()

    console.log(`Server started at http://localhost:${rsbuildServer.port}`)
  })

  rsbuildServer.connectWebSocket({ server: httpServer })

  return {
    close: async () => {
      await rsbuildServer.close()
      httpServer.close()
    },
  }
}

startDevServer()
