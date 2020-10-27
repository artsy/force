import { data as sd } from "sharify"
import { trackEvent } from "./helpers"
import { timeOnPage } from "@artsy/cohesion"
import { getContextPageFromClient } from "lib/getContextPage"

let interval

export const timeOnPageListener = (delay: number = 15000) => {
  if (interval) {
    clearInterval(interval)
  }

  interval = setTimeout(() => {
    const { pageType, pageSlug, path } = getContextPageFromClient()

    const referrer = window.analytics.__artsyClientSideRoutingReferrer
    // Grab referrer from our trackingMiddleware in Reaction, since we're in a
    // single-page-app context and the value will need to be refreshed on route
    // change. See: https://github.com/artsy/force/blob/master/src/v2/Artsy/Analytics/trackingMiddleware.ts
    let trackingOptions = {}
    if (referrer) {
      trackingOptions = {
        page: {
          referrer,
        },
      }
    }
    const contextPageOwnerSlug = pageType === "partner" ? path : pageSlug

    trackEvent(
      timeOnPage({
        contextPageOwnerSlug,
        contextPageOwnerType: pageType,
      }),
      trackingOptions
    )
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
