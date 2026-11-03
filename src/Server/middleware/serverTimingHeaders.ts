import type { NextFunction } from "express"
import type { ArtsyRequest, ArtsyResponse } from "./artsyExpress"

interface SetTimingHeaderProps {
  res: ArtsyResponse
  name: string
  /** A `performance.now()` reading; the metric is the time elapsed since. Omit for a metric without a duration. */
  start?: number
}

export function setTimingHeader({ res, name, start }: SetTimingHeaderProps) {
  if (!res.serverTimingHeaders) {
    return
  }

  if (res.serverTimingHeadersWritten) {
    console.warn(
      `Header: ${name} will not be sent, response headers have already been sent.`,
    )
  }
  const durationMilli =
    start === undefined
      ? null
      : Math.round((performance.now() - start) * 10) / 10
  res.serverTimingHeaders.set(name, durationMilli)
}

export function serverTimingHeaders(
  req: ArtsyRequest,
  res: ArtsyResponse,
  next: NextFunction,
) {
  if (req.query.serverTiming !== "true") {
    return next()
  }

  res.perfStart = performance.now()
  res.serverTimingHeaders = new Map<string, number | null>()

  const defaultWritehead = res.writeHead

  res.writeHead = function () {
    setTimingHeader({ res, name: "total", start: res.perfStart })

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
