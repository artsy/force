import type { NextFunction } from "express"
import { getAsyncLocalStorage } from "Server/asyncLocalWrapper"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

// Installs an async local store into the callback chain.
export function asyncLocalsMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
): void {
  const asyncLocalStorage = getAsyncLocalStorage()
  asyncLocalStorage.run(new Map(), () => {
    next()
  })
}
