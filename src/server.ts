import "instrument"

import { renderServerApp } from "System/Router/renderServerApp"
import express from "express"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"
import { adminServerRoutes } from "Apps/Admin/adminServerRoutes"
import { sitemapsServerApp } from "Apps/Sitemaps/sitemapsServerApp"
import { rssServerApp } from "Apps/RSS/rssServerApp"
import { redirectsServerRoutes } from "Apps/Redirects/redirectsServerRoutes"
import { cookieConsentManagerServerRoutes } from "Components/CookieConsentManager/cookieConsentManagerServerRoutes"
import { appPreferencesServerRoutes } from "Apps/AppPreferences/appPreferencesServerRoutes"
import { setupServerRouter } from "System/Router/serverRouter"
import { getRoutes } from "System/Router/Utils/routeUtils"
import { initializeMiddleware } from "middleware"
import { errorHandlerMiddleware } from "Server/middleware/errorHandler"

const app = express()

// Mount middleware
initializeMiddleware(app)

const { routes, routePaths } = getRoutes()

// React app routes
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    try {
      const { status, redirect, ...rest } = await setupServerRouter({
        next,
        req,
        res,
        routes,
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
  }
)

// Common express routes
app
  .use(appPreferencesServerRoutes)
  .use(cookieConsentManagerServerRoutes)
  .use(adminServerRoutes)
  .use(sitemapsServerApp)
  .use(rssServerApp)
  // Should be last
  .use(redirectsServerRoutes)
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
