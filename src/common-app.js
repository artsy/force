// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./lib/DOMParser"

import express from "express"
import RavenServer from "raven"
import commonMiddlewareSetup from "./common-middleware"
import errorHandlingMiddleware from "./lib/middleware/error_handler"
import morganMiddleware from "./lib/middleware/morganMiddleware"
import config from "./config"

const { SENTRY_PRIVATE_DSN } = config

const app = express()

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
import novo from "./novo/src/server"
app.use("/", novo)

// *****************************************************************************
// Force (Current)
// *****************************************************************************
import current from "./current"
app.use("/", current)

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

app.use(errorHandlingMiddleware)

module.exports = app
