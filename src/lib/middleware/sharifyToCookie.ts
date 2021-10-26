import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function sharifyToCookie(keys: string[]) {
  return function sharifyToCookie(
    req: ArtsyRequest,
    res: ArtsyResponse,
    next: NextFunction
  ) {
    for (let key of keys) {
      if (res.locals.sharify.data[key]) {
        res.cookie(key, res.locals.sharify.data[key])
      }
    }
    next()
  }
}
