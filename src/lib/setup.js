//
// Sets up initial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//

import config from "../config"
import _ from "underscore"
import addRequestId from "express-request-id"
import artsyPassport from "@artsy/passport"
import artsyXapp from "artsy-xapp"
import Backbone from "backbone"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import logger from "artsy-morgan"
import path from "path"
import session from "cookie-session"
import sharify from "sharify"
import siteAssociation from "artsy-eigen-web-association"
import superSync from "backbone-super-sync"
import { IpFilter as ipfilter } from "express-ipfilter"
import timeout from "connect-timeout"
import "./setup_sharify"
import cache from "./cache"
import downcase from "./middleware/downcase"
import ensureSSL from "./middleware/ensure_ssl"
import escapedFragmentMiddleware from "./middleware/escaped_fragment"
import hardcodedRedirects from "./middleware/hardcoded_redirects"
import hstsMiddleware from "./middleware/hsts"
import localsMiddleware from "./middleware/locals"
import proxyGravity from "./middleware/proxy_to_gravity"
import proxyReflection from "./middleware/proxy_to_reflection"
import sameOriginMiddleware from "./middleware/same_origin"
import errorHandlingMiddleware from "./middleware/error_handler"
import backboneErrorHelper from "./middleware/backbone_error_helper"
import CurrentUser from "./current_user"
import splitTestMiddleware from "../desktop/components/split_test/middleware"
import marketingModals from "./middleware/marketing_modals"
import { addIntercomUserHash } from "./middleware/intercom"
import compression from "compression"
import { assetMiddleware } from "./middleware/assetMiddleware"
import { unsupportedBrowserCheck } from "lib/middleware/unsupportedBrowser"
import { pageCacheMiddleware } from "lib/middleware/pageCacheMiddleware"

// FIXME: When deploying new Sentry SDK to prod we quickly start to see errors
// like "`CURRENT_USER` is undefined". We need more investigation because this
// only appears in prod, under load, and seems fine on staging.
// import * as Sentry from "@sentry/node"

// Old Sentry SDK
import RavenServer from "raven"

const {
  API_REQUEST_TIMEOUT,
  API_URL,
  APP_TIMEOUT,
  COOKIE_DOMAIN,
  DEFAULT_CACHE_TIME,
  IP_DENYLIST,
  NODE_ENV,
  SENTRY_PRIVATE_DSN,
  SEGMENT_WRITE_KEY_SERVER,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_SECRET,
} = config

export default function (app) {
  app.set("trust proxy", true)

  // Denied IPs
  if (IP_DENYLIST && IP_DENYLIST.length > 0) {
    app.use(
      ipfilter(IP_DENYLIST.split(","), {
        allowedHeaders: ["x-forwarded-for"],
        log: false,
        mode: "deny",
      })
    )
  }

  // Timeout middleware
  if (process.env.NODE_ENV === "production") {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  app.use(sharify)
  app.use(assetMiddleware())

  // Error reporting
  if (SENTRY_PRIVATE_DSN) {
    RavenServer.config(SENTRY_PRIVATE_DSN).install()
    app.use(RavenServer.requestHandler())
  }

  app.use(compression())

  // Blank page used by Eigen for caching web views.
  // See: https://github.com/artsy/microgravity-private/pull/1138
  app.use(require("../desktop/apps/blank"))

  // Make sure we're using SSL and prevent clickjacking
  app.use(ensureSSL)
  app.use(hstsMiddleware)

  if (!NODE_ENV === "test") {
    app.use(helmet.frameguard())
  }

  // Inject UUID for each request into the X-Request-Id header
  app.use(addRequestId())

  // Override Backbone to use server-side sync, inject the XAPP token,
  // add redis caching, and timeout for slow responses.
  superSync.timeout = API_REQUEST_TIMEOUT
  superSync.cacheClient = cache.client
  superSync.defaultCacheTime = DEFAULT_CACHE_TIME
  Backbone.sync = function (method, model, options) {
    if (options.headers == null) {
      options.headers = {}
    }
    options.headers["X-XAPP-TOKEN"] = artsyXapp.token || ""
    return superSync(method, model, options)
  }

  // Cookie and session middleware
  app.use(cookieParser())
  app.use(
    session({
      secret: SESSION_SECRET,
      domain: process.env.NODE_ENV === "development" ? "" : COOKIE_DOMAIN,
      name: SESSION_COOKIE_KEY,
      maxAge: SESSION_COOKIE_MAX_AGE,
      secure: process.env.NODE_ENV === "production" || NODE_ENV === "staging",
      httpOnly: false,
    })
  )

  // Body parser has to be after proxy middleware for
  // node-http-proxy to work with POST/PUT/DELETE
  app.use("/api", proxyGravity.api)
  app.use(proxyReflection)
  app.use(bodyParser.json())
  app.use(bodyParser.urlencoded({ extended: true }))

  // Passport middleware for authentication.
  app.use(
    artsyPassport(
      _.extend({}, config, {
        CurrentUser: CurrentUser,
        ARTSY_URL: API_URL,
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
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob
    .sync(`${__dirname}/../{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  app.use(
    favicon(path.resolve(__dirname, "../mobile/public/images/favicon.ico"))
  )
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)

  // Redirect requests before they even have to deal with Force routing
  app.use(downcase)
  app.use(hardcodedRedirects)
  app.use(localsMiddleware)
  app.use(backboneErrorHelper)
  app.use(sameOriginMiddleware)
  app.use(escapedFragmentMiddleware)
  app.use(logger)
  app.use(unsupportedBrowserCheck)
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
