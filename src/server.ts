import "instrument"

import { adminServerRoutes } from "Apps/Admin/adminServerRoutes"
import { appPreferencesServerRoutes } from "Apps/AppPreferences/appPreferencesServerRoutes"
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
import { getOrInitUnleashServer } from "System/FeatureFlags/unleashServer"
import { getRoutes } from "System/Router/Utils/routeUtils"
import { renderServerApp } from "System/Router/renderServerApp"
import { setupServerRouter } from "System/Router/serverRouter"
import express from "express"
import type { NextFunction } from "express"
import { initializeMiddleware } from "middleware"

const app = express()

// Initialize unleash server client
const unleashClient = getOrInitUnleashServer()

// Mount middleware
initializeMiddleware(app)

const { routes, routePaths } = getRoutes()

// Pre-emptive redirects
//
// These selectively match routes that would otherwise be handled by
// the route matchers below
app.get("/collection/:slug", redirectCollectionToArtistSeries)

// React app routes
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    const unleashContext = {
      userId: req.user?.id, // res.locals.sd.CURRENT_USER.id
      sessionId: req.session.id, // res.locals.sd.SESSION_ID
    }

    try {
      const { status, redirect, ...rest } = await setupServerRouter({
        next,
        req,
        res,
        routes,
        context: {
          featureFlags: {
            isEnabled: (flag: string) =>
              unleashClient.isEnabled(flag, unleashContext),
            getVariant: (flag: string) =>
              unleashClient.getVariant(flag, unleashContext),
          },
        },
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      renderServerApp({ req, res, ...rest })
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
