import "./Server/loadenv"
import express from "express"
import { createRsbuild, loadConfig, logger } from "@rsbuild/core"
import { createReloadable } from "@artsy/express-reloadable"

export async function startDevServer() {
  // Wait for multienv to load envs
  const { startServer } = require("./Server/startServer")

  const app = express()

  const { content } = await loadConfig({})

  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  })

  const rsbuildServer = await rsbuild.createDevServer()

  // Get the output path of the server build
  const stats = await rsbuildServer.environments.server.getStats()

  const { outputPath } = stats.toJson({
    all: true,
  })

  // Init RSBuild dev middleware
  app.use(rsbuildServer.middlewares)

  // Add server-side hot reloading
  const mountAndReload = createReloadable(app, require)

  mountAndReload(outputPath)

  const httpServer = await startServer(app, () => {
    rsbuildServer.afterListen()

    logger.log(
      `[Force] Server started at http://localhost:${rsbuildServer.port}`
    )
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
