// @ts-check
import express from "express"
import path from "path"
import fs from "fs"
import { createRsbuild, loadConfig, logger } from "@rsbuild/core"
import { HtmlTemplate } from "./HtmlTemplate"
import { renderToStaticMarkup, renderToString } from "react-dom/server"

const templateHtml = fs.readFileSync(
  path.resolve(process.cwd(), "src", "./template.html"),
  "utf-8"
)

let manifest
let linkPreloadTags

const serverRender = serverAPI => async (_req, res) => {
  const indexModule = await serverAPI.environments.server.loadBundle("index")

  const { entries } = JSON.parse(manifest)

  const { js = [], css = [] } = entries["index"].initial

  const scripts = js
    .map(url => `<script src="${url}" defer></script>`)
    .join("\n")

  const styles = css
    .map(file => `<link rel="stylesheet" href="${file}">`)
    .join("\n")

  linkPreloadTags = JSON.parse(
    await fs.promises.readFile("./dist/early-hints.json", "utf-8")
  )
    .map(url => `<link rel="preload" as="script" href="${url}">`)
    .join("\n")

  // const markup = indexModule.render()
  const html = renderToStaticMarkup(
    <HtmlTemplate
      icons={{}}
      sd={{}}
      manifest={{}}
      disable={{}}
      content={{
        linkPreloadTags,
        scripts,
        styles,
      }}
    />
  )

  res.writeHead(200, {
    "Content-Type": "text/html",
  })

  res.end(html)
}

export async function startDevServer() {
  const { content } = await loadConfig({})

  // Init Rsbuild
  const rsbuild = await createRsbuild({
    rsbuildConfig: content,
  })

  rsbuild.onDevCompileDone(async () => {
    // update manifest info when rebuild
    manifest = await fs.promises.readFile("./dist/manifest.json", "utf-8")
  })

  const app = express()

  // Create Rsbuild DevServer instance
  const rsbuildServer = await rsbuild.createDevServer()

  const serverRenderMiddleware = serverRender(rsbuildServer)

  app.get("/", async (req, res, next) => {
    try {
      await serverRenderMiddleware(req, res, next)
    } catch (err) {
      logger.error("SSR render error, downgrade to CSR...\n", err)
      next()
    }
  })

  // Apply Rsbuild’s built-in middlewares
  app.use(rsbuildServer.middlewares)

  const httpServer = app.listen(rsbuildServer.port, () => {
    // Notify Rsbuild that the custom server has started
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
