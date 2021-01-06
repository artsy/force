import * as Sentry from "@sentry/browser"

let INITIALIZED = false

export function setupSentry(sd) {
  if (INITIALIZED) {
    return
  }
  Sentry.init({
    dsn: sd.SENTRY_PUBLIC_DSN,
    beforeSend(event, hint) {
      const error = hint.originalException
      if (error && error.message) {
        if (error.message.match(/pktAnnotationHighlighter/i)) {
          return null
        }
      }
      return event
    },
  })
  INITIALIZED = true
}
