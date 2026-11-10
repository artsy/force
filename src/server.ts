import "instrument"

import { adminServerRoutes } from "Apps/Admin/adminServerRoutes"
import { appPreferencesServerRoutes } from "Apps/AppPreferences/appPreferencesServerRoutes"
import { redirectCollectionToGene } from "Apps/Collect/Server/redirectCollectionToGene"
import { redirectCollectionToArtistSeries } from "Apps/Collect/Server/redirectCollectionToArtistSeries"
import { rssServerApp } from "Apps/RSS/rssServerApp"
import { redirectsServerRoutes } from "Apps/Redirects/redirectsServerRoutes"
import { sitemapsServerApp } from "Apps/Sitemaps/sitemapsServerApp"
import { cookieConsentManagerServerRoutes } from "Components/CookieConsentManager/cookieConsentManagerServerRoutes"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import { errorHandlerMiddleware } from "Server/middleware/errorHandler"
import { getUnleashContext } from "System/FeatureFlags/unleashContext"
import {
  createSSRFeatureFlags,
  getOrInitUnleashServer,
} from "System/FeatureFlags/unleashServer"
import { getRoutes } from "System/Router/Utils/routeUtils"
import { renderServerApp } from "System/Router/renderServerApp"
import { setupServerRouter } from "System/Router/serverRouter"
import express from "express"
import type { NextFunction } from "express"
import { initializeMiddleware } from "middleware"

const app = express()

// Initialize unleash server client
getOrInitUnleashServer()

// Mount middleware
initializeMiddleware(app)

const { routes, routePaths } = getRoutes()

// Pre-emptive redirects
//
// These selectively match routes that would otherwise be handled by
// the route matchers below
app.get(
  "/collection/:slug",
  redirectCollectionToArtistSeries,
  redirectCollectionToGene,
)

// React app routes
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    const unleashContext = getUnleashContext({
      user: res.locals.sd.CURRENT_USER,
      sessionId: res.locals.sd.SESSION_ID,
    })

    const featureFlags = createSSRFeatureFlags(unleashContext)

    try {
      const { status, redirect, ...rest } = await setupServerRouter({
        next,
        req,
        res,
        routes,
        context: featureFlags.context,
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      // Rendering is done, so these are exactly the flags it read. The browser
      // client is seeded with them so hydration sees the same values.
      res.locals.sd.UNLEASH_TOGGLES = featureFlags.getEvaluatedToggles()

      renderServerApp({ req, res, code: status, ...rest })
    } catch (error) {
      console.error(error)
      next(error)
    }
  },
)

// Common express routes
app
  .use(appPreferencesServerRoutes)
  .use(cookieConsentManagerServerRoutes)
  .use(adminServerRoutes)
  .use(sitemapsServerApp)
  .use(rssServerApp)
  // Should be second to last
  .use(redirectsServerRoutes)
  // Final middleware. Errors and anything else should be last
  .use("*", (req, res, next) => {
    const err = new Error()
    // @ts-ignore -- FIXME: status does not exist on err
    err.status = 404
    err.message = "Not Found"
    next(err)
  })
  .use(errorHandlerMiddleware)

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
