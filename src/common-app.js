// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./lib/DOMParser"

// Needs to be first, due to sharify side-effects.
import commonMiddlewareSetup from "./common-middleware"

import express from "express"
import path from "path"
import RavenServer from "raven"
import { initializeForce } from "./current"
import config from "./config"
import { errorHandlerMiddleware } from "./lib/middleware/errorHandler"
import { morganMiddleware } from "./lib/middleware/morgan"

const { NODE_ENV, SENTRY_PRIVATE_DSN } = config

const app = express()

function initialize(startServerCallback) {
  app.set("trust proxy", true)

  // Log all routes
  app.use(
    morganMiddleware({
      development: process.env.NODE_ENV === "development",
      logAssets: process.env.LOG_ASSETS === "true",
    })
  )

  // *****************************************************************************
  // Install common middlewares
  // *****************************************************************************
  commonMiddlewareSetup(app)

  // *****************************************************************************
  // Blank page used by Eigen for caching web views.
  //
  // See: https://github.com/artsy/microgravity-private/pull/1138
  // Does this need to come before middleware?
  // *****************************************************************************
  app.use(require("./desktop/apps/blank"))

  // *****************************************************************************
  // Health Check
  //
  // TODO: Move to own function
  // *****************************************************************************

  // Routes for pinging system time and up
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() })
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // *****************************************************************************
  // Force (Novo)
  // *****************************************************************************
  // TODO: Move this into the index.dev.js
  if (NODE_ENV === "development") {
    const { createReloadable } = require("@artsy/express-reloadable")
    const mountAndReload = createReloadable(app, require)
    mountAndReload(path.resolve("src/v2/server.ts"), {
      watchModules: [path.resolve(process.cwd(), "src/v2")],
    })
  } else {
    app.use("/", require("./v2/server"))
  }

  // *****************************************************************************
  // Force (Current)
  // *****************************************************************************
  const forceApp = initializeForce(() => {
    startServerCallback()
  })
  app.use("/", forceApp)

  // *****************************************************************************
  // Error Handling
  //
  // TODO: Move to a its own function.
  // *****************************************************************************

  // 404 handler
  app.get("*", (req, res, next) => {
    const err = new Error()
    err.status = 404
    err.message = "Not Found"
    next(err)
  })

  // Error handling

  // FIXME: Investigate issue with new Sentry middleware. See note near import.
  // Sentry error handling appear above other middleware
  // if (SENTRY_PUBLIC_DSN) {
  //   app.use(Sentry.Handlers.errorHandler())
  // }

  // Old Sentry SDK.
  if (SENTRY_PRIVATE_DSN) {
    app.use(RavenServer.errorHandler())
  }

  app.use(errorHandlerMiddleware)

  return app
}

// TODO: Remove when no longer needed for hot reloading
module.exports = app
module.exports.initialize = initialize
