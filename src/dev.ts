import "./Server/loadenv"
import express, { Express } from "express"
import { createRsbuild, loadConfig, logger } from "@rsbuild/core"
import { serverHMR } from "Server/serverHMR"

export async function startDevServer() {
  // Wait for multienv to load envs
  const { startServer } = require("./Server/startServer")

  const app = express()

  const { content } = await loadConfig({})

  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  })

  const rsbuildServer = await rsbuild.createDevServer()

  // Load compiled server code
  const server: Express = await rsbuildServer.environments.server.loadBundle(
    "index"
  )

  // const mountAndReload = createReloadable(app, require)

  // Mount express-reloadable on app
  // mountAndReload(path.resolve("src/server.ts"), {
  //   watchModules: [path.resolve(process.cwd(), "src"), "@artsy/fresnel"],
  // })

  // serverHMR(app, server)

  // serverHMR(app, server)

  app.use("/", server)

  app.use(rsbuildServer.middlewares)

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
