import type { Request, Response } from "express"

export interface ArtsyRequest extends Request {
  _parsedUrl?: any
  timedout?: any
  session?: any
  id?: any
  user?: any
}

export interface ArtsyResponse extends Response {
  cookie: any
  locals: any
  backboneError?: any
}
