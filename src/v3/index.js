require("coffeescript/register")
require("@babel/register")({
  extensions: [".ts", ".js", ".tsx", ".jsx"],
  plugins: ["babel-plugin-dynamic-import-node"],
})
require("dotenv/config")

const config = require("../../webpack")
const express = require("express")
const morgan = require("morgan")
const path = require("path")
const webpack = require("webpack")
const { createReloadable } = require("@artsy/express-reloadable")

const { NODE_ENV, PORT } = process.env
const isDevelopment = NODE_ENV === "development"
const app = express()

if (isDevelopment) {
  app.use(morgan("dev"))
  app.use(require("../lib/webpack-dev-server").app)

  // app.use(require("./src/index.ts"))
  const mountAndReload = createReloadable(app, require)
  mountAndReload(path.resolve("src/v3/src"))
  // app.use(mountAndReload(path.resolve(__dirname, "src")))
} else {
  app.use(require("./src"))
}

app.listen(PORT, () => {
  const bootMessage = isDevelopment
    ? `\n[App] Booting...  \n`
    : `\n[App] Started on http://localhost:5000  \n`

  console.log(bootMessage)
})

/////////////////////////////////////////////
