import { data as sd } from "sharify"
import Cookies from "cookies-js"

// Sync
export function syncNonCacheableData() {
  // userAgent values should likely be removed from sharify.
  sd["EIGEN"] = navigator.userAgent.match("Artsy-Mobile") != null
  sd["IS_GOOGLEBOT"] = Boolean(navigator.userAgent.match(/Googlebot/i))
  sd["IS_MOBILE"] = Boolean(
    (navigator.userAgent.match(/iPhone/i) &&
      !navigator.userAgent.match(/iPad/i)) ||
      (navigator.userAgent.match(/Android/i) &&
        navigator.userAgent.match(/Mobile/i)) ||
      navigator.userAgent.match(/Windows Phone/i) ||
      navigator.userAgent.match(/BB10/i) ||
      navigator.userAgent.match(/BlackBerry/i)
  )
  sd["IS_TABLET"] = Boolean(
    (navigator.userAgent.match(/iPad/i) &&
      navigator.userAgent.match(/Mobile/i)) ||
      // specifically targets Vivo
      (navigator.userAgent.match(/vivo/i) &&
        navigator.userAgent.match(/Mobile/i)) ||
      // targets android devices that are not mobile
      (navigator.userAgent.match(/Android/i) &&
        navigator.userAgent.match(/Mobile/i))
  )

  // Load sensitive data from cookies.
  sd["ARTSY_XAPP_TOKEN"] = Cookies.get("ARTSY_XAPP_TOKEN")
  sd["IP_ADDRESS"] = Cookies.get("IP_ADDRESS")
  sd["REQUEST_ID"] = Cookies.get("REQUEST_ID")
  sd["SESSION_ID"] = Cookies.get("SESSION_ID")
}
