//
// Sets up initial project settings, middleware, mounted apps, and
// global configuration such as overriding Backbone.sync and
// populating sharify data
//

import ddTracer from "dd-trace"
import _ from "underscore"
import addRequestId from "express-request-id"
import artsyPassport from "@artsy/passport"
import artsyXapp from "artsy-xapp"
import { argv } from "yargs"
import Backbone from "backbone"
import bodyParser from "body-parser"
import bucketAssets from "bucket-assets"
import cookieParser from "cookie-parser"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import helmet from "helmet"
import logger from "artsy-morgan"
import path from "path"
import RavenServer from "raven"
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
import unsupportedBrowserCheck from "./middleware/unsupported_browser"
import backboneErrorHelper from "./middleware/backbone_error_helper"
import CurrentUser from "./current_user"
import splitTestMiddleware from "../desktop/components/split_test/middleware"
import marketingModals from "./middleware/marketing_modals"
import { addIntercomUserHash } from "./middleware/intercom"
import { middleware as stitchMiddleware } from "@artsy/stitch/dist/internal/middleware"
import * as globalReactModules from "desktop/components/react/stitch_components"
import config from "../config"
import compression from "compression"
import expressStaticGzip from "express-static-gzip"
import { assetMiddleware } from "./middleware/assets"

const {
  API_REQUEST_TIMEOUT,
  API_URL,
  APP_TIMEOUT,
  COOKIE_DOMAIN,
  DEFAULT_CACHE_TIME,
  IP_BLACKLIST,
  NODE_ENV,
  OPENREDIS_URL,
  REQUEST_EXPIRE_MS,
  REQUEST_LIMIT,
  SENTRY_PRIVATE_DSN,
  SEGMENT_WRITE_KEY_SERVER,
  SESSION_COOKIE_KEY,
  SESSION_COOKIE_MAX_AGE,
  SESSION_SECRET,
  DD_APM_ENABLED,

  // FIXME: Remove once bucket-assets has been removed
  ENABLE_EXPERIMENTAL_ASSET_BUNDLING,
} = config

const isDevelopment = NODE_ENV === "development"
const isProduction = NODE_ENV === "production"

export default function(app) {
  // Timeout middleware
  if (isProduction) {
    app.use(timeout(APP_TIMEOUT || "29s"))
  }

  // Error reporting
  if (SENTRY_PRIVATE_DSN) {
    RavenServer.config(SENTRY_PRIVATE_DSN).install()
    app.use(RavenServer.requestHandler())
  }

  app.use(compression())

  // Blacklist IPs
  app.use(
    ipfilter(IP_BLACKLIST.split(","), {
      allowedHeaders: ["x-forwarded-for"],
      log: false,
      mode: "deny",
    })
  )

  // Rate limiting
  if (OPENREDIS_URL && cache.client) {
    const limiter = require("express-limiter")(app, cache.client)
    limiter({
      path: "*",
      method: "all",
      lookup: ["headers.x-forwarded-for"],
      total: REQUEST_LIMIT,
      expire: REQUEST_EXPIRE_MS,
      onRateLimited(req, res, next) {
        console.log("Rate limit exceeded for", req.headers["x-forwarded-for"])
        return next()
      },
    })
  }

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
  Backbone.sync = function(method, model, options) {
    if (options.headers == null) {
      options.headers = {}
    }
    options.headers["X-XAPP-TOKEN"] = artsyXapp.token || ""
    return superSync(method, model, options)
  }

  // Inject sharify data before any app code
  app.use(sharify)

  // Cookie and session middleware
  app.use(cookieParser())
  app.set("trust proxy", true)
  app.use(
    session({
      secret: SESSION_SECRET,
      domain: isDevelopment ? "" : COOKIE_DOMAIN,
      name: SESSION_COOKIE_KEY,
      maxAge: SESSION_COOKIE_MAX_AGE,
      secure: isProduction || NODE_ENV === "staging",
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

  // Development servers
  if (isDevelopment) {
    app.use(require("./webpack-dev-server"))

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

  // Mount static assets from root `public` and /app `public` folders
  glob
    .sync(`${__dirname}/../{public,{desktop,mobile}/**/public}`)
    .forEach(fld => {
      app.use(express.static(fld))
    })

  if (ENABLE_EXPERIMENTAL_ASSET_BUNDLING) {
    // Load compressed JS assets
    app.use(
      expressStaticGzip(path.join(__dirname, "../../public"), {
        index: false,
        enableBrotli: true,
        orderPreference: ["br", "gz"],
        // TODO: Is this the best place to set this cache control header?
        setHeaders: (res, path) => {
          res.setHeader("Cache-Control", "public, max-age=31536000")
        },
      })
    )

    app.use(assetMiddleware)
  } else {
    // When running `yarn start:prod` locally don't mount bucket assets
    if (!argv.debugProd) {
      app.use(bucketAssets())
    }
  }

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
  app.use(splitTestMiddleware)
  app.use(addIntercomUserHash)

  // Configure stitch SSR functionality. See: https://github.com/artsy/stitch/tree/master/src/internal
  // for more info.
  app.use(
    stitchMiddleware({
      modules: globalReactModules,
      wrapper: globalReactModules.StitchWrapper,
    })
  )

  if (DD_APM_ENABLED) {
    ddTracer.init({
      hostname: process.env.DD_TRACE_AGENT_HOSTNAME,
      service: "force",
      plugins: false,
    })
    ddTracer.use("express", {
      // We want the root spans of MP to be labelled as just `service`
      service: "force",
      headers: ["User-Agent"],
    })
    ddTracer.use("http", {
      service: `force.http-client`,
    })
  }

  // Routes for pinging system time and up
  app.get("/system/time", (req, res) =>
    res.status(200).send({ time: Date.now() })
  )
  app.get("/system/up", (req, res) => {
    res.status(200).send({ nodejs: true })
  })

  // Sets up mobile marketing signup modal
  app.use(marketingModals)

  // Setup hot-swap loader. See https://github.com/artsy/express-reloadable
  if (isDevelopment) {
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
      watchModules: ["@artsy/reaction", "@artsy/stitch"],
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

  // Last but not least, error handling...
  if (SENTRY_PRIVATE_DSN) app.use(RavenServer.errorHandler())
  app.use(errorHandlingMiddleware)
}
