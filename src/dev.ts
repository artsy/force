import "./Server/loadenv"
import { execSync } from "child_process"
import { createReloadable } from "@artsy/express-reloadable"
import { createRsbuild, loadConfig, logger } from "@rsbuild/core"
import express from "express"

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
    const url = `http://localhost:${rsbuildServer.port}`

    rsbuildServer.afterListen()

    logger.log(`[Force] Server started at ${url}`)

    // Open the browser
    execSync(`open ${url}`)
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
