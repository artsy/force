import type { NextFunction, Request, Response } from "express"

interface ArtsyRequest extends Request {
  cookie: any
  locals: any
}

// Add CSRF to the cookie and remove it from the page. This will allows the
// caching on the html.
export default function csrfTokenMiddleware(
  res: ArtsyRequest,
  req: Response,
  next: NextFunction
) {
  if (res.cookie && res.locals) {
    res.cookie("CSRF_TOKEN", res.locals.sd.CSRF_TOKEN)
    // Clear the embedded CSRF_TOKEN, an alternative method would be to update
    // @artsy/passport to make the CSRF_TOKEN optional.
    delete res.locals.sd.CSRF_TOKEN
  }
  next()
}
