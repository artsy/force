import { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"

interface RedirectProps {
  onRedirect?: () => void
  url?: string
  status?: number
  req: ArtsyRequest
  res: ArtsyResponse
}

export function redirect({
  url = "/",
  status = 302,
  onRedirect,
  req,
  res,
}: RedirectProps) {
  res.locals.hasRedirected = true

  if (onRedirect) {
    onRedirect()
  } else {
    res.redirect(url, status)
  }
}
