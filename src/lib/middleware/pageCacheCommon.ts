import type { ArtsyResponse } from "./artsyExpress"

export type CacheRecorder = (body: Buffer, res: ArtsyResponse) => void

// The buffer to store the response.
const chunks: Buffer[] = []

/**
 * We only want to attach one response recorder in the event that there are
 * multiple response handlers.
 */
let responseHandlerAttached = false
export const attachResponseRecorder = (res: ArtsyResponse) => {
  if (responseHandlerAttached) return

  const defaultWrite = res.write
  const defaultEnd = res.end

  // @ts-ignore
  res.write = (...restArgs) => {
    if (restArgs[0]) {
      chunks.push(new Buffer(restArgs[0]))
    }
    defaultWrite.apply(res, restArgs)
  }

  // @ts-ignore
  res.end = (...restArgs) => {
    if (restArgs.length > 1 && restArgs[0]) {
      chunks.push(new Buffer(restArgs[0]))
    }
    defaultEnd.apply(res, restArgs)
  }

  responseHandlerAttached = true
}

/**
 * Attaches a response handler that will receive the response output when the
 * request is completed.
 */
export const attachResponseHandler = (
  res: ArtsyResponse,
  cb: CacheRecorder
) => {
  res.once("finish", () => {
    const body = Buffer.concat(chunks)
    cb(body, res)
  })
}
