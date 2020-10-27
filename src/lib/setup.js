//
// Sets up initial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//

import "./setup_sharify"

import { extend } from "lodash"
import addRequestId from "express-request-id"
import artsyPassport from "@artsy/passport"
import artsyXapp from "@artsy/xapp"
import bodyParser from "body-parser"
// import compression from "compression"
import cookieParser from "cookie-parser"
// import express from "express"
// import favicon from "serve-favicon"
// import glob from "glob"
import helmet from "helmet"
import path from "path"
// import sharify from "sharify"
// import siteAssociation from "artsy-eigen-web-association"
import timeout from "connect-timeout"
import cache from "./cache"
import CurrentUser from "./current_user"
import config from "../config"
import addIntercomUserHash from "./middleware/intercom"
import assetMiddleware from "./middleware/assetMiddleware"
import backboneErrorHelper from "./middleware/backbone_error_helper"
import downcase from "./middleware/downcase"
import ensureSSL from "./middleware/ensure_ssl"
import errorHandlingMiddleware from "./middleware/error_handler"
import escapedFragmentMiddleware from "./middleware/escaped_fragment"
import hardcodedRedirects from "./middleware/hardcoded_redirects"
import hstsMiddleware from "./middleware/hsts"
import ipFilter from "./middleware/ipFilter"
import localsMiddleware from "./middleware/locals"
import marketingModals from "./middleware/marketing_modals"
import pageCacheMiddleware from "./middleware/pageCacheMiddleware"
import proxyGravity from "./middleware/proxy_to_gravity"
import proxyReflection from "./middleware/proxy_to_reflection"
import sameOriginMiddleware from "./middleware/same_origin"
import sessionMiddleware from './middleware/sessionMiddleware'
import splitTestMiddleware from "../desktop/components/split_test/middleware"
import unsupportedBrowserCheckMiddleware from "./middleware/unsupportedBrowser"

// FIXME: When deploying new Sentry SDK to prod we quickly start to see errors
// like "`CURRENT_USER` is undefined". We need more investigation because this
// only appears in prod, under load, and seems fine on staging.
// import * as Sentry from "@sentry/node"

// Old Sentry SDK
import RavenServer from "raven"

const {
  API_URL,
  APP_TIMEOUT,
  CLIENT_ID,
  CLIENT_SECRET,
  IP_DENYLIST,
  NODE_ENV,
  SENTRY_PRIVATE_DSN,
  SEGMENT_WRITE_KEY_SERVER,
} = config

export default function (app) {

  // Denied IPs
  if (IP_DENYLIST && IP_DENYLIST.length > 0) {
    app.use(ipFilter(IP_DENYLIST))
  }

  // Timeout middleware
  if (process.env.NODE_ENV === "production") {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  // app.use(sharify)

  // Static asset routing
  app.use(assetMiddleware())

  // Error reporting
  if (SENTRY_PRIVATE_DSN) {
    RavenServer.config(SENTRY_PRIVATE_DSN).install()
    app.use(RavenServer.requestHandler())
  }

  // Ensure all responses are gzip compressed
  // app.use(compression())

  // Blank page used by Eigen for caching web views.
  // See: https://github.com/artsy/microgravity-private/pull/1138
  app.use(require("../desktop/apps/blank"))

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSSL)

  // Use HSTS to prevent downgrade attacks.
  app.use(hstsMiddleware)

  // Prevent frame nesting in development and production.
  if (!NODE_ENV === "test") {
    app.use(helmet.frameguard())
  }

  // Inject UUID for each request into the X-Request-Id header
  app.use(addRequestId())

  // Cookie and session middleware
  app.use(cookieParser())

  //
  app.use(sessionMiddleware())

  // Body parser has to be after proxy middleware for
  // node-http-proxy to work with POST/PUT/DELETE
  // TODO: Remove the gravity proxy.
  // app.use("/api", proxyGravity.api)

  app.use(proxyReflection)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Passport middleware for authentication.
  app.use(
    artsyPassport(
      extend({}, config, {
        CurrentUser: CurrentUser,
        ARTSY_URL: API_URL,
        ARTSY_ID: CLIENT_ID,
        ARTSY_SECRET: CLIENT_SECRET,
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
          "type",
        ],
      })
    )
  )

  // Add CSRF to the cookie and remove it from the page. This will allows the
  // caching on the html.
  app.use((req, res, next) => {
    res.cookie("CSRF_TOKEN", res.locals.sd.CSRF_TOKEN)
    // Clear the embedded CSRF_TOKEN, an alternative method would be to update
    // @artsy/passport to make the CSRF_TOKEN optional.
    delete res.locals.sd.CSRF_TOKEN
    next()
  })

  // Development servers
  if (process.env.NODE_ENV === "development") {
    app.use(require("./webpack-dev-server").app)

    app.use(
      require("stylus").middleware({
        src: path.resolve(__dirname, "../desktop"),
        dest: path.resolve(__dirname, "../desktop/public"),
      })
    )
    app.use(
      require("stylus").middleware({
        src: path.resolve(__dirname, "../mobile"),
        dest: path.resolve(__dirname, "../mobile/public"),
      })
    )
  }

  // Static assets

  // Mount static assets from root public folder
  // app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  // glob
  //   .sync(`${__dirname}/../{public,{desktop,mobile}/**/public}`)
  //   .forEach(folder => {
  //     app.use(express.static(folder))
  //   })

  // app.use(
  //   favicon(path.resolve(__dirname, "../mobile/public/images/favicon.ico"))
  // )
  // app.use("/(.well-known/)?apple-app-site-association", siteAssociation)

  // Redirect requests before they even have to deal with Force routing
  app.use(downcase)
  app.use(hardcodedRedirects)
  app.use(localsMiddleware)
  app.use(backboneErrorHelper)
  app.use(sameOriginMiddleware)
  app.use(escapedFragmentMiddleware)
  app.use(unsupportedBrowserCheckMiddleware)
  app.use(addIntercomUserHash)
  app.use(pageCacheMiddleware)

  // Routes for pinging system time and up
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() })
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // Sets up mobile marketing signup modal
  app.use(marketingModals)

  if (NODE_ENV !== "test") {
    app.use(splitTestMiddleware)
  }

  // Setup hot-swap loader. See https://github.com/artsy/express-reloadable
  if (process.env.NODE_ENV === "development") {
    const { createReloadable } = require("@artsy/express-reloadable")
    const mountAndReload = createReloadable(app, require)

    app.use((req, res, next) => {
      if (res.locals.sd.IS_MOBILE) {
        // Mount reloadable mobile app
        const mobileApp = mountAndReload(path.resolve("src/mobile"))
        mobileApp(req, res, next)
      } else {
        next()
      }
    })

    // Mount reloadable desktop
    mountAndReload(path.resolve("src/desktop"), {
      watchModules: [
        path.resolve(process.cwd(), "src/v2"),
        "@artsy/reaction",
        "@artsy/stitch",
        "@artsy/palette",
        "@artsy/fresnel",
      ],
    })

    // In staging or prod, mount routes normally
  } else {
    app.use((req, res, next) => {
      if (res.locals.sd.IS_MOBILE) {
        // Mount mobile app
        require("../mobile")(req, res, next)
      } else {
        next()
      }
    })

    // Mount desktop app
    app.use(require("../desktop"))
  }

  // Ensure CurrentUser is set for Artsy Passport
  // TODO: Investigate race condition b/t reaction's use of AP
  // TODO: This is only run once, does it need to still happen
  artsyPassport.options.CurrentUser = CurrentUser

  // 404 handler
  app.get("*", (req, res, next) => {
    const err = new Error()
    err.status = 404
    err.message = "Not Found"
    next(err)
  })

  // Error handling

  // FIXME: Investigate issue with new Sentry middleware. See note near import.
  // Sentry error handling appear above other middleware
  // if (SENTRY_PUBLIC_DSN) {
  //   app.use(Sentry.Handlers.errorHandler())
  // }

  // Old Sentry SDK.
  if (SENTRY_PRIVATE_DSN) {
    app.use(RavenServer.errorHandler())
  }

  app.use(errorHandlingMiddleware)
}
