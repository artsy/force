import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

export function setTimingHeader(
  res: ArtsyResponse,
  name: string,
  durationMilli: number | null = null
) {
  if (!res.serverTimingHeaders) {
    return
  }

  if (res.serverTimingHeadersWritten) {
    console.warn(
      `Header: ${name} will not be sent, response headers have already been sent.`
    )
  }
  res.serverTimingHeaders.set(name, durationMilli)
}

export function serverTimingHeaders(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction
) {
  if (req.query.serverTiming !== "true") {
    return next()
  }

  res.perfStart = Date.now()
  res.serverTimingHeaders = new Map<string, number | null>()

  const defaultWritehead = res.writeHead

  res.writeHead = function () {
    const perfEnd = Date.now()
    setTimingHeader(res, "total", perfEnd - res.perfStart)

    const timingHeaders: string[] = []
    for (const key of res.serverTimingHeaders!.keys()) {
      const duration = res.serverTimingHeaders!.get(key)

      if (duration === null) {
        timingHeaders.push(key)
      } else {
        timingHeaders.push(`${key};dur=${duration}`)
      }
    }

    res.serverTimingHeadersWritten = true
    res.set("Server-Timing", timingHeaders.join(", "))

    return defaultWritehead.apply(this, arguments)
  }
  next()
}
