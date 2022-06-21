import { useEffect } from "react"
import { pathToRegexp } from "path-to-regexp"
import { useRouter } from "v2/System/Router/useRouter"

const allowedPatterns = [
  "/",
  "/art-fairs",
  "/article/:slug",
  "/articles",
  "/artist/:slug,",
  "/artists",
  "/auctions",
  "/collect",
  "/collection/:slug",
  "/fair/:slug",
  "/galleries",
  "/gene/:slug",
  "/partner/:slug",
  "/show/:slug",
  "/shows",
  "/viewing-room/:slug",
  "/viewing-rooms",
].map(path => pathToRegexp(path))

export const isMatchingRoute = (pathname): boolean => {
  return allowedPatterns.some(pattern => pattern.test(pathname))
}

// adapted from here:
// https://segment.com/docs/connections/destinations/catalog/braze/#other-features

export const useBrazeInAppMessage = () => {
  const { match } = useRouter()
  const pathname = match.location.pathname

  useEffect(() => {
    // @ts-ignore
    const { analytics, appboy } = window

    if (!analytics || !appboy || !pathname) return

    let subscriptionId

    analytics.ready(() => {
      subscriptionId = appboy.subscribeToNewInAppMessages(inAppMessages => {
        if (inAppMessages.length < 1 || !isMatchingRoute(pathname))
          return inAppMessages

        appboy.display.showInAppMessage(inAppMessages[0])
        return inAppMessages.slice(1)
      })
    })

    return () => {
      if (!subscriptionId) return

      appboy.removeSubscription(subscriptionId)
    }
  })
}
