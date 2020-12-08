const startTime = Date.now()
require("dotenv/config")
require("coffeescript/register")
require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
  plugins: ["babel-plugin-dynamic-import-node"],
})

const { setAliases } = require("require-control")
const express = require("express")
const path = require("path")

const { initialize } = require("./common-app")
// Force resolution of potentially `yarn link`'d modules to the local node_modules
// folder. This gets around SSR issues involving single react context requirements,
// amongst other things. This is server-side only. Client-side must be resolved
// via webpack.
setAliases({
  react: path.resolve(__dirname, "../node_modules/react"),
  "react-dom": path.resolve(__dirname, "../node_modules/react-dom"),
  "styled-components": path.resolve(
    __dirname,
    "../node_modules/styled-components"
  ),
})

function startServer() {
  const app = express()

  const force = initialize(() => {
    // eslint-disable-next-line no-console
    const endTime = Date.now()
    console.log(
      `[Force] development server loaded in ${(endTime - startTime) / 1000}s`
    )
  })

  app.use(force)

  const server = app.listen(5000, "localhost", err => {
    if (err) {
      console.error(err)
      return
    }

    // eslint-disable-next-line no-console
    console.log("[Force] Listening on localhost:5000")
  })

  process.on("SIGTERM", () => {
    // eslint-disable-next-line no-console
    console.log("[Force] Stopping development server")
    server.close(() => {
      process.exit(0)
    })
  })
}

;(() => {
  startServer()
})()
