// Required for @artsy/react-html-parser which is included by @artsy/reaction
// TODO: Find a way to remove JSDOM from our server.
import "./Server/DOMParser"

// Setup sharify
// TODO: Export a function instead of loading on import.
import "./Server/setup_sharify"

import artsyPassport from "./Server/passport"
import addRequestId from "express-request-id"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import path from "path"
// eslint-disable-next-line no-restricted-imports
import sharify from "sharify"
import siteAssociation from "@artsy/eigen-web-association"
import timeout from "connect-timeout"
import bodyParser from "body-parser"
import {
  APP_TIMEOUT,
  API_URL,
  APP_URL,
  APPLE_CLIENT_ID,
  APPLE_KEY_ID,
  APPLE_PRIVATE_KEY,
  APPLE_TEAM_ID,
  CLIENT_ID,
  CLIENT_SECRET,
  FACEBOOK_ID,
  FACEBOOK_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_SECRET,
  SEGMENT_WRITE_KEY_SERVER,
  IP_DENYLIST,
  NODE_ENV,
  SENTRY_PRIVATE_DSN,
} from "./Server/config"

// NOTE: Previoiusly, when deploying new Sentry SDK to prod we quickly start to
// see errors like "`CURRENT_USER` is undefined". We need more investigation
// because this only appears in prod, under load, and seems fine on staging.
import * as Sentry from "@sentry/node"

import { morganMiddleware } from "./Server/middleware/morgan"
import { ensureSslMiddleware } from "./Server/middleware/ensureSsl"
import { hstsMiddleware } from "./Server/middleware/hsts"
import { ipFilter } from "./Server/middleware/ipFilter"
import { sessionMiddleware } from "./Server/middleware/session"
import { assetMiddleware } from "./Server/middleware/asset"
import { csrfTokenMiddleware } from "./Server/middleware/csrfToken"
import { asyncLocalsMiddleware } from "./Server/middleware/asyncLocalMiddleware"
import { bootstrapSharifyAndContextLocalsMiddleware } from "./Server/middleware/bootstrapSharifyAndContextLocalsMiddleware"
import { userRequiredMiddleware } from "./Server/middleware/userRequiredMiddleware"
import { downcaseMiddleware } from "./Server/middleware/downcase"
import { hardcodedRedirectsMiddleware } from "./Server/middleware/hardcodedRedirects"
import { localsMiddleware } from "./Server/middleware/locals"
import { sameOriginMiddleware } from "./Server/middleware/sameOrigin"
import { serverTimingHeaders } from "./Server/middleware/serverTimingHeaders"
import { IGNORED_ERRORS } from "./Server/analytics/sentryFilters"
import { featureFlagMiddleware } from "./Server/middleware/featureFlagMiddleware"
import {
  UnleashFeatureFlagService,
  UnleashService,
} from "./Server/featureFlags/unleashService"
import { registerFeatureFlagService } from "./Server/featureFlags/featureFlagService"
import { userPreferencesMiddleware } from "./Server/middleware/userPreferencesMiddleware"
import { appPreferencesMiddleware } from "Apps/AppPreferences/appPreferencesMiddleware"

// Find the v2 routes, we will not be testing memory caching for legacy pages.

export function initializeMiddleware(app) {
  app.use(serverTimingHeaders)

  app.set("trust proxy", true)

  // Setup error handling
  if (SENTRY_PRIVATE_DSN) {
    Sentry.init({
      dsn: SENTRY_PRIVATE_DSN,
      ignoreErrors: IGNORED_ERRORS,
    })

    app.use(Sentry.Handlers.requestHandler())
  }

  // Cookie parser
  app.use(cookieParser())

  // Ensure all responses are gzip compressed
  app.use(compression())

  // Ensure basic security settings
  applySecurityMiddleware(app)

  // Sharify and async locals
  app.use(bootstrapSharifyAndContextLocalsMiddleware)

  app.use(
    morganMiddleware({
      development: process.env.NODE_ENV === "development",
      logAssets: process.env.LOG_ASSETS === "true",
    })
  )

  // Redirect requests before they even have to deal with Force routing
  app.use(downcaseMiddleware)
  app.use(hardcodedRedirectsMiddleware)
  app.use(localsMiddleware)
  app.use(sameOriginMiddleware)

  // Need sharify for unleash
  registerFeatureFlagService(UnleashService, UnleashFeatureFlagService)
  app.use(featureFlagMiddleware(UnleashService))

  /**
   * Routes for pinging system time and up
   */
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() })
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // Static assets
  applyStaticAssetMiddlewares(app)
}

function applySecurityMiddleware(app) {
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

  // JSON Body Parser is required for getting the `_csurf` token for passport.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

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

  // Get user preferences (e.g. metric, currency)
  app.use(userPreferencesMiddleware)

  // Get app preferences (e.g. theme)
  app.use(appPreferencesMiddleware)
}

function applyStaticAssetMiddlewares(app) {
  // Mount static assets from root public folder
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob.sync(`${__dirname}/{public,**/public}`).forEach(folder => {
    app.use(express.static(folder))
  })

  // TODO: Move to ./public/images
  app.use(favicon(path.resolve(__dirname, "public/images/favicon.ico")))
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)
}
