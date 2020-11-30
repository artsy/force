import type { NextFunction, Request, RequestHandler, Response } from "express"

export function unless(
  path: string,
  middleware: RequestHandler
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (path === req.baseUrl) {
      next()
    } else {
      middleware(req, res, next)
    }
  }
}

export function unlessStartsWith(
  path: string,
  middleware: RequestHandler
): RequestHandler {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.baseUrl.startsWith(path)) {
      next()
    } else {
      middleware(req, res, next)
    }
  }
}
