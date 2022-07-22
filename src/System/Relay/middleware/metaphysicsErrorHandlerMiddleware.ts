import { NetworkError } from "Utils/errors"

export function metaphysicsErrorHandlerMiddleware({
  checkStatus,
}: {
  checkStatus?: boolean
}) {
  return next => async req => {
    const response = await next(req)
    if (!checkStatus || (response.status >= 200 && response.status < 300)) {
      return response
    } else {
      const error = new NetworkError(response.statusText)
      error.response = response
      throw error
    }
  }
}
