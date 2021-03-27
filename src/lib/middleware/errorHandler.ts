import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import type { NextFunction } from "express"

import { argv } from "yargs"
import { IpDeniedError } from "express-ipfilter"
import config from "../../config"
import path from "path"
import RavenServer from "raven"

const { NODE_ENV, SENTRY_PRIVATE_DSN, VERBOSE_LOGGING } = config

export function errorHandlerMiddleware(
  err: any,
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  let code
  let detail
  let message
  const file = path.resolve(
    __dirname,
    "../../desktop/components/error_handler/index.jade"
  )

  if (req.timedout) {
    code = 504
  }
  if (!code) {
    code = err.status || 500
  }

  if (err instanceof IpDeniedError) {
    code = 401
  }

  const enableLogging =
    NODE_ENV === "development" || argv.verbose || VERBOSE_LOGGING === true
  if (enableLogging) {
    message = err.message || err.text || err.toString()
    detail = err.stack

    if (err.status !== 404) {
      // eslint-disable-next-line no-console
      console.log(detail)
    }
  }

  res.status(code).render(file, { code, detail, message })
}

export function setupErrorHandling(app) {
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
}
