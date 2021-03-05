import { init } from "@sentry/browser"

let INITIALIZED = false

/**
 * Errors that should not be sent to sentry
 */
const OMITTED_ERRORS = [
  /pktAnnotationHighlighter/g, // Pocket ios app errors on opening articles
  /SecurityError: Blocked a frame with origin/g, // Facebook scripts error on opening articles
]

export const maybeSendErrorToSentry = (error): boolean => {
  let doSendError = true
  OMITTED_ERRORS.map(err => {
    if (error.message.match(err)) {
      doSendError = false
    }
  })
  return doSendError
}

export function setupSentry(sd) {
  if (INITIALIZED) {
    return
  }
  init({
    dsn: sd.SENTRY_PUBLIC_DSN,
    beforeSend(event, hint) {
      const error = hint.originalException
      if (error && error.message) {
        const sendError = maybeSendErrorToSentry(error)
        if (sendError) {
          return event
        } else {
          return null
        }
      }
    },
  })
  INITIALIZED = true
}
