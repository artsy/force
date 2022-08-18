import { getClientParam } from "Utils/getClientParam"
import { getURLHost } from "Utils/url"
import sanitizeRedirect from "Server/passport/sanitize-redirect"

export const afterUpdateRedirect = () => {
  const afterUpdateURL = getClientParam("after_update")

  if (afterUpdateURL) {
    const sanitizedURL = sanitizeRedirect(afterUpdateURL)
    return sanitizedURL
  }

  return ""
}

export const redirectMessage = url => {
  const urlHost = getURLHost(url)
  if (urlHost) {
    return "You will be redirected to: " + urlHost
  } else {
    return ""
  }
}
