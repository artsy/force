import express from "express"
import RavenServer from "raven"
import { errorHandlerMiddleware } from "./errorHandler"
import config from "../../config"

const { SENTRY_PRIVATE_DSN } = config

export const app = express()

app.get("*", (req, res, next) => {
  const err = new Error()
  // @ts-ignore -- FIXME: status does not exist on err
  err.status = 404
  err.message = "Not Found"
  next(err)
})

if (SENTRY_PRIVATE_DSN) {
  // Old Sentry SDK.
  app.use(RavenServer.errorHandler())

  RavenServer.config(SENTRY_PRIVATE_DSN).install()
  app.use(RavenServer.requestHandler())
}

app.use(errorHandlerMiddleware)
