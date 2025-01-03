import { get } from "Utils/get"
import { HttpError } from "found"

export function principalFieldErrorHandlerMiddleware() {
  return next => async req => {
    const res = await next(req)
    const statusCode = get(
      res,
      r => r.json.extensions.principalField.httpStatusCode,
    )

    if (statusCode) {
      throw new HttpError(statusCode)
    } else {
      return res
    }
  }
}
