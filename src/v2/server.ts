import { buildServerApp } from "v2/System/Router/server"
import { getRouteConfig } from "./System/Router/getRouteConfig"
import { renderServerApp } from "./System/Router/renderServerApp"
import express from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import type { NextFunction } from "express"
import { adminServerRoutes } from "v2/Apps/Admin/adminServerRoutes"
import { sitemapsServerApp } from "v2/Apps/Sitemaps/sitemapsServerApp"
import { rssServerApp } from "v2/Apps/RSS/rssServerApp"
import { redirectsServerRoutes } from "v2/Apps/Redirects/redirectsServerRoutes"
import {
  APP_URL,
  APPLE_CLIENT_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
  APPLE_TEAM_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  API_URL,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  SEGMENT_WRITE_KEY_SERVER,
} from "config"
import { CurrentUser } from "lib/current_user"
import { csrfTokenMiddleware } from "lib/middleware/csrfToken"
import { userRequiredMiddleware } from "lib/middleware/userRequiredMiddleware"
import artsyPassport from "lib/passport"

const app = express()
const { routes, routePaths } = getRouteConfig()

// Passport middleware for authentication.
app.use(
  artsyPassport({
    APP_URL,
    APPLE_CLIENT_ID,
    APPLE_KEY_ID,
    APPLE_PRIVATE_KEY,
    APPLE_TEAM_ID,
    ARTSY_ID: CLIENT_ID,
    ARTSY_SECRET: CLIENT_SECRET,
    ARTSY_URL: API_URL,
    CurrentUser: CurrentUser,
    FACEBOOK_ID,
    FACEBOOK_SECRET,
    GOOGLE_CLIENT_ID,
    GOOGLE_SECRET,
    SEGMENT_WRITE_KEY: SEGMENT_WRITE_KEY_SERVER,
    userKeys: [
      "collector_level",
      "default_profile_id",
      "email",
      "has_partner_access",
      "id",
      "lab_features",
      "name",
      "paddle_number",
      "phone",
      "roles",
      "type",
    ],
  })
)

// Add CSRF to the cookie and remove it from the page. This will allows the
// caching on the html and is used by the Login Modal to make secure requests.
app.use(csrfTokenMiddleware)

// Require a user for these routes
app.use(userRequiredMiddleware)

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    if (res.locals.cachedPageAvailable) {
      res.send(res.locals.cachedPageData)
      return
    }

    try {
      const { status, redirect, ...rest } = await buildServerApp({
        assetsPath: "/assets",
        loadableFile: "loadable-novo-stats.json",
        loadablePath: "public/assets",
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

/**
 * Mount server-side Express routes
 */

// TODO: Extract into an app file
// Experiment with overwriting OneTrust consent cookie with server-side version
// to get around Safari's 7 day limit for client-side cookies.
app
  .get("/set-tracking-preferences", (req, res) => {
    const { OptanonAlertBoxClosed, OptanonConsent } = req.query

    const cookieConfig = {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: false,
      secure: true,
    }

    if (OptanonAlertBoxClosed !== "undefined") {
      res.cookie("OptanonAlertBoxClosed", OptanonAlertBoxClosed, cookieConfig)
    }

    if (OptanonConsent) {
      res.cookie("OptanonConsent", OptanonConsent, cookieConfig)
    }

    res.send("[Force] Consent cookie set.")
  })
  .use(adminServerRoutes)
  .use(sitemapsServerApp)
  .use(rssServerApp)
  // Should be last
  .use(redirectsServerRoutes)

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
