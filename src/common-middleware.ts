// Setup sharify
// TODO: Export a function instead of loading on import.
import "./lib/setup_sharify"

import artsyPassport from "@artsy/passport"
import addRequestId from "express-request-id"
import compression from "compression"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import path from "path"
import sharify from "sharify"
import siteAssociation from "artsy-eigen-web-association"
import timeout from "connect-timeout"
import { ensureSslMiddleware } from "./lib/middleware/ensureSsl"
import { hstsMiddleware } from "./lib/middleware/hsts"
import { ipFilter } from "./lib/middleware/ipFilter"
import { sessionMiddleware } from "./lib/middleware/session"
import config from "./config"
import { assetMiddleware } from "./lib/middleware/asset"
import bodyParser from "body-parser"
import { csrfTokenMiddleware } from "./lib/middleware/csrfToken"
import { sharifyLocalsMiddleware } from "./lib/middleware/sharifyLocals"
import { collectionToArtistSeriesRedirect } from "./lib/middleware/artistSeriesRedirect"
import { userRequiredMiddleware } from "lib/middleware/userRequiredMiddleware"
import { artistMiddleware } from "lib/middleware/artistMiddleware"

const CurrentUser = require("./lib/current_user.coffee")

const {
  APP_TIMEOUT,
  IP_DENYLIST,
  NODE_ENV,
  CLIENT_ID,
  CLIENT_SECRET,
  API_URL,
  SEGMENT_WRITE_KEY_SERVER,
} = config

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

  // Cookie parser
  app.use(cookieParser())

  // Session cookie
  app.use(sessionMiddleware())

  // JSON Body Parser is required for getting the `_csurf` token for passport.
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Passport middleware for authentication.
  app.use(
    artsyPassport({
      ...config,
      ...{
        ARTSY_ID: CLIENT_ID,
        ARTSY_SECRET: CLIENT_SECRET,
        ARTSY_URL: API_URL,
        CurrentUser: CurrentUser,
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
      },
    })
  )

  // Add CSRF to the cookie and remove it from the page. This will allows the
  // caching on the html and is used by the Login Modal to make secure requests.
  app.use(csrfTokenMiddleware)

  // Require a user for these routes
  app.use(userRequiredMiddleware)
}

function applyStaticAssetMiddlewares(app) {
  // Mount static assets from root public folder
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob
    .sync(`${__dirname}/{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  // TODO: Move to ./public/images
  app.use(favicon(path.resolve(__dirname, "mobile/public/images/favicon.ico")))
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)
}

export default function commonMiddlewareSetup(app) {
  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.

  // Attach sharify object to `locals` because almost all other middleware
  // relies on it existing.
  app.use(sharify)

  // Static asset routing, required for all legacy code and must come early
  // because `local.asset` is required to render the error page.
  app.use(assetMiddleware())

  // Ensure basic security settings
  applySecurityMiddleware(app)

  // Ensure all responses are gzip compressed
  app.use(compression())

  // Static assets
  applyStaticAssetMiddlewares(app)

  // Sharify locals
  app.use(sharifyLocalsMiddleware)

  // Redirects
  app.get("/collection/:collectionSlug", collectionToArtistSeriesRedirect)

  /**
   * Mount middleware for handling server-side portions of apps mounted into
   * global router.
   */
  app.get("/artist/*", artistMiddleware)
}
