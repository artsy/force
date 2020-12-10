import express from "express"
import path from "path"

const config = require("../../config")
const { NODE_ENV } = config

const app = express()

export function initializeNovo() {
  if (NODE_ENV === "development") {
    const { createReloadable } = require("@artsy/express-reloadable")
    const mountAndReload = createReloadable(app, require)
    mountAndReload(path.resolve("src/novo/src/routes.ts"), {
      watchModules: [path.resolve(process.cwd(), "src/v2")],
    })
  } else {
    app.use("/", require("./routes"))
  }
  return app
}
