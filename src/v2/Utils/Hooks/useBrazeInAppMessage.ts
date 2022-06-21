import { useEffect } from "react"
import { pathToRegexp } from "path-to-regexp"

// adapted from here:
// https://segment.com/docs/connections/destinations/catalog/braze/#other-features

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

export const generateMessageHandler = (appboy, pathname) => {
  const messageHandler = inAppMessages => {
    if (inAppMessages.length < 1 || !isMatchingRoute(pathname))
      return inAppMessages

    appboy.display.showInAppMessage(inAppMessages[0])
    return inAppMessages.slice(1)
  }

  return messageHandler
}

export const generateAppboyFuncs = (appboy, pathname) => {
  let subscriptionId

  const messageHandler = generateMessageHandler(appboy, pathname)

  const handleAnalyticsReady = () => {
    subscriptionId = appboy.subscribeToNewInAppMessages(messageHandler)
  }

  const effectTeardown = () => {
    if (!subscriptionId) return

    appboy.removeSubscription(subscriptionId)
  }

  return { handleAnalyticsReady, effectTeardown }
}

export const generateBrazeEffect = ({
  analytics,
  appboy,
  pathname,
}): (() => void) => {
  const effect = () => {
    if (!analytics || !appboy || !pathname) return
    let { handleAnalyticsReady, effectTeardown } = generateAppboyFuncs(
      appboy,
      pathname
    )
    analytics.ready(handleAnalyticsReady)
    return effectTeardown
  }

  return effect
}

export const useBrazeInAppMessage = ({ analytics, appboy, pathname }) => {
  const brazeEffect = generateBrazeEffect({ analytics, appboy, pathname })
  useEffect(brazeEffect)
}
