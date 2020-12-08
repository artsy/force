// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./lib/DOMParser"

// Setup sharify
// TODO: Export a function instead of loading on import.
import "./lib/setup_sharify"

import chalk from "chalk"
import express from "express"
import RavenServer from "raven"

import { errorHandlerMiddleware } from "./lib/middleware/errorHandler"
import { initializeForce } from "./current"
import { initializeNovo } from "./novo/src/server"
import { morganMiddleware } from "./lib/middleware/morgan"
import commonMiddlewareSetup from "./common-middleware"
import config from "./config"

const { NODE_ENV, SENTRY_PRIVATE_DSN } = config

const app = express()

// eslint-disable-next-line no-console
console.log(chalk.green(`\n[Force] NODE_ENV=${NODE_ENV}\n`))

export function initialize(startServerCallback) {
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
  const novoApp = initializeNovo()
  app.use("/", novoApp)

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
    ;(err as any).status = 404
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
