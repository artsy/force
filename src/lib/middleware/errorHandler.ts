import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"
import type { NextFunction } from "express"

import { argv } from "yargs"
import { IpDeniedError } from "express-ipfilter"
import { NODE_ENV, VERBOSE_LOGGING } from "../../config"
import path from "path"

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
