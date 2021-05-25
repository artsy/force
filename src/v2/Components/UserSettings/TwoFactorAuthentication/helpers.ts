import { getClientParam } from "v2/Utils/getClientParam"
import sanitizeRedirect from "@artsy/passport/sanitize-redirect"

export const afterUpdateRedir = () => {
  const afterUpdateURL = getClientParam("after_update")

  if (afterUpdateURL) {
    const sanitizedURL = sanitizeRedirect(afterUpdateURL)

    // a '/' means URL is bad
    if (sanitizedURL !== '/') {
      return sanitizedURL
    }
  }

  return ''
}
