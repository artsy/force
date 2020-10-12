import React from "react"
import { renderToString } from "react-dom/server"
import express from "express"
import adminOnly from "desktop/lib/admin_only"
import { stitch } from "@artsy/stitch"
import { buildServerApp } from "v2/Artsy/Router/server"
import { App } from "./App"
import { routes } from "./routes"
import { ServerStyleSheet } from "styled-components"

export const app = express()

app.get("/ssr-experiments", adminOnly, (_req, res, _next) => {
  const sheet = new ServerStyleSheet()
  const html = renderToString(sheet.collectStyles(<App />))
  const styleTags = sheet.getStyleTags()

  res.send(
    `
<html>
  <head>
    <title>Fix hydration</title>
    ${styleTags}
  </head>
  <body>
    <div id='react-root'>${html}</div>

    <script src='/assets/runtime.js'></script>
    <script src='/assets/artsy.js'></script>
    <script src='/assets/common-artsy.js'></script>
    <script src='/assets/common-backbone.js'></script>
    <script src='/assets/common-jquery.js'></script>
    <script src='/assets/common-react.js'></script>
    <script src='/assets/common-utility.js'></script>
    <script src='/assets/common.js'></script>

    <script src='/assets/ssr-experiments.js'></script>
  </body>
</html>
  `.trim()
  )
})

app.get("/ssr-experiments/stitch", adminOnly, async (_req, res, next) => {
  try {
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        body: App,
      },
      locals: {
        ...res.locals,
        assetPackage: "ssr-experiments",
      },
    })

    res.send(layout)
  } catch (error) {
    console.error(error)
    next()
  }
})

app.get("/ssr-experiments/router", adminOnly, async (req, res, next) => {
  try {
    const { bodyHTML, styleTags } = await buildServerApp({
      routes,
      url: req.url,
    })

    res.send(
      `
  <html>
    <head>
      <title>Fix hydration</title>
      ${styleTags}
    </head>
    <body>
      <div id='react-root'>${bodyHTML}</div>

      <script src='/assets/runtime-manifest.js'></script>
      <script src='/assets/common.js'></script>
      <script src='/assets/ssr-experiments.js'></script>
    </body>
  </html>
    `.trim()
    )
  } catch (error) {
    console.error(error)
    next()
  }
})

app.get("/ssr-experiments/all*", adminOnly, async (req, res, next) => {
  try {
    const { bodyHTML, styleTags } = await buildServerApp({
      routes,
      url: req.url,
    })

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      blocks: {
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "ssr-experiments",
        styleTags,
      },
    })

    res.send(layout)
  } catch (error) {
    console.error(error)
    next(error)
  }
})
