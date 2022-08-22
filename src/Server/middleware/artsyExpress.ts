import type { Request, Response } from "express"

export interface ArtsyRequest extends Request {
  _parsedUrl?: any
  id?: any
  session?: any
  timedout?: any
  user?: any
}

export interface ArtsyResponse extends Response {
  _headers: any[]
  cookie: any
  locals: any
  perfStart: any
  serverTimingHeaders?: Map<string, number | null>
  serverTimingHeadersWritten?: boolean
}
