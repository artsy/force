import { pathToRegexp } from "path-to-regexp"

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

/**
 * Subscribe valid paths to Braze In-App Messages
 */
export const subscribeToInAppMessagesByPath = () => {
  const { analytics, appboy, location } = window as typeof window & {
    appboy: any
  }

  if (!analytics || !appboy || !location) return

  appboy.subscribeToNewInAppMessages(inAppMessages => {
    if (inAppMessages.length < 1 || !isMatchingRoute(location.pathname)) {
      return inAppMessages
    }

    appboy.display.showInAppMessage(inAppMessages[0])
    {
      return inAppMessages.slice(1)
    }
  })
}
