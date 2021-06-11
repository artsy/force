import { HttpError } from "found"
import { get } from "v2/Utils/get"

export function principalFieldErrorHandlerMiddleware() {
  return next => async req => {
    const res = await next(req)
    const statusCode = get(
      res,
      r => r.json.extensions.principalField.httpStatusCode
    )

    if (statusCode) {
      throw new HttpError(statusCode)
    } else {
      return res
    }
  }
}
