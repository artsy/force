import { match } from "path-to-regexp"
import { getContextPageFromClient } from "Server/getContextPage"
import { OwnerType } from "@artsy/cohesion"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"

const foundExcludedPath = excludedRoutes => {
  const isFound = excludedRoutes.some(excludedPath => {
    const contextPage = getContextPageFromClient()

    if (contextPage) {
      const { path } = contextPage
      const matcher = match(excludedPath, { decode: decodeURIComponent })
      const foundMatch = !!matcher(path)
      return foundMatch
    }
  })
  return isFound
}

export const trackPageView = (excludedRoutes: string[] = []) => {
  maybeTrackAuctionPageView()

  const isExcluded = foundExcludedPath(excludedRoutes)
  if (!isExcluded) {
    const contextPage = getContextPageFromClient()

    if (contextPage) {
      const { path, pageType } = contextPage
      const properties = { path }
      // Add commercial properties to artwork pageviews
      if (pageType === OwnerType.artwork) {
        properties["acquireable"] = sd.ARTWORK.is_acquireable
        properties["availability"] = sd.ARTWORK.availability
        properties["price_listed"] =
          sd.ARTWORK.price && sd.ARTWORK.price.length > 0
      }

      window.analytics?.page(properties, { integrations: { Marketo: false } })
    }
  }
}

const maybeTrackAuctionPageView = () => {
  const contextPage = getContextPageFromClient()

  if (contextPage) {
    const { pageType, pageSlug, path } = contextPage
    if (pageType === OwnerType.sale) {
      // Skip bid, already tracked in v2/Artsy/Analytics/trackingMiddleware
      const matcher = match("/auction/:saleID/bid(2)?/:artworkID", {
        decode: decodeURIComponent,
      })
      const matchedBidRoute = matcher(path)

      if (!matchedBidRoute) {
        window.addEventListener("load", function () {
          // distinct event required for marketing integrations (Criteo)
          window.analytics?.track("Auction Pageview", {
            auction_slug: pageSlug,
          })
        })
      }
    }
  }
}
