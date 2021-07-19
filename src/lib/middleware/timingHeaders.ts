import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function setTimingHeader(
  res: ArtsyResponse,
  name: string,
  durationMilli: number | null = null
) {
  if (res.timingHeadersWritten) {
    console.warn(
      `Header: ${name} will not be sent, response headers have already been sent.`
    )
  }
  res.timingHeaders.set(name, durationMilli)
}

export function timingHeadersMiddleware(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  res.perfStart = Date.now()
  res.timingHeaders = new Map<string, number | null>()

  const defaultWritehead = res.writeHead

  res.writeHead = function () {
    const perfEnd = Date.now()
    setTimingHeader(res, "total", perfEnd - res.perfStart)

    const timingHeaders: string[] = []
    for (const key of res.timingHeaders.keys()) {
      const duration = res.timingHeaders.get(key)

      if (duration === null) {
        timingHeaders.push(key)
      } else {
        timingHeaders.push(`${key};dur=${duration}`)
      }
    }

    res.timingHeadersWritten = true
    res.set("Server-Timing", timingHeaders.join(", "))

    return defaultWritehead.apply(this, arguments)
  }
  next()
}
