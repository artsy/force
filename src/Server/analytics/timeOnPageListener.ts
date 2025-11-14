import { getContextPageFromClient } from "Server/getContextPage"
import { timeOnPage } from "@artsy/cohesion"
// biome-ignore lint/style/noRestrictedImports: Server configuration requires sharify
import { data as sd } from "sharify"
import { trackEvent } from "./helpers"
import { setAnalyticsClientReferrerOptions } from "./setAnalyticsClientReferrerOptions"

let interval

export const timeOnPageListener = (delay = 15000) => {
  if (interval) {
    clearInterval(interval)
  }

  interval = setTimeout(() => {
    const contextPage = getContextPageFromClient()

    if (contextPage) {
      const { pageType, pageSlug, path } = contextPage
      const contextPageOwnerSlug = pageType === "partner" ? path : pageSlug
      const trackingOptions = setAnalyticsClientReferrerOptions()

      trackEvent(
        timeOnPage({
          contextPageOwnerSlug,
          contextPageOwnerType: pageType,
        }),
        trackingOptions,
      )
    }
  }, delay)
}

class PageTimeTracker {
  path: string
  delay: number
  description: string
  timer: any

  constructor(path, delay, description) {
    this.path = path
    this.delay = delay
    this.description = description
    this.timer = null
    this.track()
  }

  setPath(newPath) {
    this.path = newPath
  }

  track() {
    this.timer = timeOnPageListener()
  }

  clear() {
    if (this.timer) clearTimeout(this.timer)
  }

  reset(newPath = null) {
    this.clear()
    if (newPath) this.setPath(newPath)
    this.track()
  }
}

export const trackTimeOnPage = () => {
  if (sd.IS_MOBILE) {
    timeOnPageListener()
  } else {
    window.desktopPageTimeTrackers = [
      new PageTimeTracker(sd.CURRENT_PATH, 15000, "15 seconds"),
    ]
  }
}
