// @ts-check

require("@artsy/multienv").loadEnvs(".env.shared", ".env")

const { createRsbuild, loadConfig } = require("@rsbuild/core")
const { createReloadable } = require("@artsy/express-reloadable")
const { startServer } = require("./Server/startServer")
const path = require("path")
const express = require("express")

async function startDevServer() {
  const { content } = await loadConfig({})

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  })

  const app = express()

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer()

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares)

  // const mountAndReload = createReloadable(app, require)

  // Mount express-reloadable on app
  // mountAndReload(path.resolve("./server.ts"), {
  //   watchModules: [path.resolve(process.cwd(), "src"), "@artsy/fresnel"],
  // })

  // Start server
  const server = await startServer(app, async () => {
    // rsbuildServer.port
    // Notify Rsbuild that the custom server has started
    await rsbuildServer.afterListen()
  })

  rsbuildServer.connectWebSocket({ server })

  // Listen for exit and close processes
  process.on("SIGTERM", async () => {
    console.log("Stopping dev server.")
    await rsbuildServer.close()
  })
}

;(async () => {
  await startDevServer()
})()
