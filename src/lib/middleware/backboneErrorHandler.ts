import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function backboneErrorHandlerMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
): void {
  res.backboneError = function (model, err) {
    let message, status
    try {
      message = JSON.parse(err.text).error
    } catch {
      message =
        (err != null ? err.text : undefined) ||
        __guard__(err != null ? err.response : undefined, x => x.text) ||
        (err != null ? err.stack : undefined) ||
        (err != null ? err.message : undefined)
      if (message == null) {
        message = (() => {
          try {
            return JSON.stringify(err)
          } catch {
            return "Unknown Error"
          }
        })()
      }
    }
    if ([404, 403, 401].includes(err != null ? err.status : undefined)) {
      status = 404
      message = "Not Found"
    } else {
      status = (err != null ? err.status : undefined) || 500
    }
    err = new Error()
    err.message = message
    err.status = status
    next(err)
  }
  next()
}

function __guard__(value, transform) {
  return typeof value !== "undefined" && value !== null
    ? transform(value)
    : undefined
}
