import { getAsyncLocalStorage } from "Server/asyncLocalWrapper"
import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

// Installs an async local store into the callback chain.
export function asyncLocalsMiddleware(
  _req: ArtsyRequest,
  _res: ArtsyResponse,
  next: NextFunction,
): void {
  const asyncLocalStorage = getAsyncLocalStorage()
  asyncLocalStorage.run(new Map(), () => {
    next()
  })
}
