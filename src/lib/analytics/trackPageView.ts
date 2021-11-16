import { match } from "path-to-regexp"
import { getContextPageFromClient } from "lib/getContextPage"
import { OwnerType } from "@artsy/cohesion"
import { data as sd } from "sharify"

const foundExcludedPath = excludedRoutes => {
  const isFound = excludedRoutes.some(excludedPath => {
    const { path } = getContextPageFromClient()
    const matcher = match(excludedPath, { decode: decodeURIComponent })
    const foundMatch = !!matcher(path)
    return foundMatch
  })
  return isFound
}

export const trackPageView = (excludedRoutes: string[] = []) => {
  maybeTrackAuctionPageView()

  const isExcluded = foundExcludedPath(excludedRoutes)
  if (!isExcluded) {
    const { path, pageType } = getContextPageFromClient()
    const properties = { path }
    // Add commercial properties to artwork pageviews
    if (pageType === OwnerType.artwork) {
      properties["acquireable"] = sd.ARTWORK.is_acquireable
      properties["availability"] = sd.ARTWORK.availability
      properties["price_listed"] =
        sd.ARTWORK.price && sd.ARTWORK.price.length > 0
    }
    // Disable Parsely firing on non-article pages
    if (pageType !== OwnerType.article) {
      window.PARSELY = { autotrack: false }
    }

    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.page(properties, { integrations: { Marketo: false } })
  }
}

const maybeTrackAuctionPageView = () => {
  const { pageType, pageSlug, path } = getContextPageFromClient()
  if (pageType === OwnerType.sale) {
    // Skip bid, already tracked in v2/Artsy/Analytics/trackingMiddleware
    const matcher = match("/auction/:saleID/bid(2)?/:artworkID", {
      decode: decodeURIComponent,
    })
    const matchedBidRoute = matcher(path)

    if (!matchedBidRoute) {
      window.addEventListener("load", function () {
        // distinct event required for marketing integrations (Criteo)
        // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
        window.analytics.track("Auction Pageview", { auction_slug: pageSlug })
      })
    }
  }
}
