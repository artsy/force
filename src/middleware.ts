import path from "path"
import bodyParser from "body-parser"
import compression from "compression"
import timeout from "connect-timeout"
import cookieParser from "cookie-parser"
import express from "express"
import addRequestId from "express-request-id"
import glob from "glob"
import helmet from "helmet"
import favicon from "serve-favicon"
// eslint-disable-next-line no-restricted-imports
import sharify from "sharify"
import {
  API_URL,
  APPLE_CLIENT_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
  APPLE_TEAM_ID,
  APP_TIMEOUT,
  APP_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  IP_DENYLIST,
  NODE_ENV,
  SEGMENT_WRITE_KEY_SERVER,
} from "./Server/config"
import artsyPassport from "./Server/passport"

import { appPreferencesMiddleware } from "Apps/AppPreferences/appPreferencesMiddleware"
import { bootstrapSharify } from "./Server/bootstrapSharify"
import { assetMiddleware } from "./Server/middleware/assetMiddleware"
import { asyncLocalsMiddleware } from "./Server/middleware/asyncLocalMiddleware"
import { bootstrapSharifyAndContextLocalsMiddleware } from "./Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { csrfTokenMiddleware } from "./Server/middleware/csrfToken"
import { downcaseMiddleware } from "./Server/middleware/downcase"
import { ensureSslMiddleware } from "./Server/middleware/ensureSsl"
import { hardcodedRedirectsMiddleware } from "./Server/middleware/hardcodedRedirects"
import { hstsMiddleware } from "./Server/middleware/hsts"
import { ipFilter } from "./Server/middleware/ipFilter"
import { localsMiddleware } from "./Server/middleware/locals"
import { morganMiddleware } from "./Server/middleware/morgan"
import { sameOriginMiddleware } from "./Server/middleware/sameOrigin"
import { serverTimingHeaders } from "./Server/middleware/serverTimingHeaders"
import { sessionMiddleware } from "./Server/middleware/session"
import { userRequiredMiddleware } from "./Server/middleware/userRequiredMiddleware"

bootstrapSharify()

export function initializeMiddleware(app) {
  app.use(serverTimingHeaders)

  app.set("trust proxy", true)

  // Cookie parser
  app.use(cookieParser())

  // Ensure all responses are gzip compressed
  app.use(compression())

  // JSON Body Parser is required for getting the `_csurf` token for passport.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Denied IPs
  if (IP_DENYLIST && IP_DENYLIST.length > 0) {
    app.use(ipFilter(IP_DENYLIST))
  }

  // Timeout middleware
  if (process.env.NODE_ENV === "production") {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSslMiddleware)

  // Use HSTS to prevent downgrade attacks.
  app.use(hstsMiddleware)

  // Prevent frame nesting in development and production.
  if (NODE_ENV !== "test") {
    app.use(helmet.frameguard())
  }

  // Inject UUID for each request into the X-Request-Id header
  app.use(addRequestId())

  // Session cookie
  app.use(sessionMiddleware())

  // Initialize async context for the request
  app.use(asyncLocalsMiddleware)

  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  // Attach sharify object to `locals` because almost all other middleware
  // relies on it existing.
  app.use(sharify)

  // Static asset routing, required for all legacy code and must come early
  // because `local.asset` is required to render the error page.
  app.use(assetMiddleware())

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
        "length_unit_preference",
        "name",
        "paddle_number",
        "phone",
        "roles",
        "type",
      ],
    }),
  )

  // Require a user for these routes
  app.use(userRequiredMiddleware)

  // Get app preferences (e.g. theme)
  app.use(appPreferencesMiddleware)

  // Sharify and async locals
  app.use(bootstrapSharifyAndContextLocalsMiddleware)

  app.use(
    morganMiddleware({
      development: process.env.NODE_ENV === "development",
      logAssets: process.env.LOG_ASSETS === "true",
    }),
  )

  // Redirect requests before they even have to deal with Force routing
  app.use(downcaseMiddleware)
  app.use(hardcodedRedirectsMiddleware)
  app.use(localsMiddleware)
  app.use(sameOriginMiddleware)

  // Add CSRF to the cookie and remove it from the page. This allows the caching
  // on the html and is used by the Login Modal to make secure requests.
  app.use(csrfTokenMiddleware)

  /**
   * Routes for pinging system time and up
   */
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() }),
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // Mount static assets from root public folder
  app.use(express.static("dist"))

  // Mount static assets from sub-app /app `public` folders
  glob.sync(`${__dirname}/{public,**/public}`).forEach(folder => {
    app.use(express.static(folder))
  })

  // TODO: Move to ./public/images
  app.use(favicon(path.resolve(__dirname, "public/images/favicon.ico")))
}
