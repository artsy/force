import { captureException, withScope } from "@sentry/browser"

export class NetworkError extends Error {
  response: any
}

export class ErrorWithMetadata extends Error {
  metadata: object

  constructor(message, metadata = {}) {
    super(message)
    this.metadata = metadata
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, this.constructor)
    }
  }
}

export const reportErrorWithScope = (
  error: Error | ErrorWithMetadata
) => scope => {
  if (error instanceof ErrorWithMetadata) {
    Object.entries(error.metadata).forEach(([key, value]) => {
      scope.setExtra(key, value)
    })
  }
  captureException(error)
}

export const sendErrorToService = (error: Error | ErrorWithMetadata) => {
  withScope(reportErrorWithScope(error))
}
