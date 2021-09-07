import type { ArtsyResponse } from "./artsyExpress"

export type RequestRecorderCallback = (body: Buffer, res: ArtsyResponse) => void

export class RequestRecorder {
  /**
   * The buffer to store the response.
   */
  private chunks: Buffer[] = []

  /**
   * We only want to attach one response recorder in the event that there are
   * multiple response handlers.
   */
  private responseHandlerAttached = false

  public attachResponseRecorder(res: ArtsyResponse) {
    if (this.responseHandlerAttached) return

    const defaultWrite = res.write
    const defaultEnd = res.end

    // @ts-ignore
    res.write = (...restArgs) => {
      if (restArgs[0]) {
        this.chunks.push(new Buffer(restArgs[0]))
      }
      defaultWrite.apply(res, restArgs)
    }

    // @ts-ignore
    res.end = (...restArgs) => {
      if (restArgs.length > 1 && restArgs[0]) {
        this.chunks.push(new Buffer(restArgs[0]))
      }
      defaultEnd.apply(res, restArgs)
    }

    this.responseHandlerAttached = true
  }

  /**
   * Attaches a response handler that will receive the response output when the
   * request is completed.
   */
  public attachResponseHandler(
    res: ArtsyResponse,
    cb: RequestRecorderCallback
  ) {
    res.once("finish", () => {
      const body = Buffer.concat(this.chunks)
      cb(body, res)
    })
  }
}
