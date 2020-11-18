import { extend } from "lodash"
import artsyPassport from "@artsy/passport"
import bodyParser from "body-parser"
import path from "path"

const CurrentUser = require("./current_user.coffee")
import config from "../config"
import { unlessStartsWith } from "./middleware/unless"
import { intercomMiddleware } from "./middleware/intercom"
import { assetMiddleware } from "./middleware/asset"
import { backboneErrorHandlerMiddleware } from "./middleware/backboneErrorHandler"
import { csrfTokenMiddleware } from "./middleware/csrfToken"
import { downcaseMiddleware } from "./middleware/downcase"
import { escapedFragmentMiddleware } from "./middleware/escapedFragment"
import { hardcodedRedirectsMiddleware } from "./middleware/hardcodedRedirects"
import { localsMiddleware } from "./middleware/locals"
import { marketingModalsMiddleware } from "./middleware/marketingModals"
import { pageCacheMiddleware } from "./middleware/pageCache"
import { proxyReflectionMiddleware } from "./middleware/proxyReflection"
import { sameOriginMiddleware } from "./middleware/sameOrigin"
import { unsupportedBrowserMiddleware } from "./middleware/unsupportedBrowser"

const splitTestMiddleware = require("../desktop/components/split_test/middleware.coffee")

// FIXME: When deploying new Sentry SDK to prod we quickly start to see errors
// like "`CURRENT_USER` is undefined". We need more investigation because this
// only appears in prod, under load, and seems fine on staging.
// import * as Sentry from "@sentry/node"

// Old Sentry SDK
import RavenServer from "raven"

const {
  API_URL,
  CLIENT_ID,
  CLIENT_SECRET,
  SENTRY_PRIVATE_DSN,
  SEGMENT_WRITE_KEY_SERVER,
} = config

export default function forceMiddleware(app) {
  // Static asset routing
  app.use(unlessStartsWith("/novo", assetMiddleware()))

  // Error reporting
  if (SENTRY_PRIVATE_DSN) {
    RavenServer.config(SENTRY_PRIVATE_DSN).install()
    app.use(RavenServer.requestHandler())
  }

  //
  app.use(proxyReflectionMiddleware)
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
          "roles",
          "type",
        ],
      })
    )
  )

  // Add CSRF to the cookie and remove it from the page. This will allows the
  // caching on the html.
  // TODO: Verify if this must occur after passport and after cookie parser
  app.use(csrfTokenMiddleware)

  // Redirect requests before they even have to deal with Force routing
  app.use(unlessStartsWith("/novo", downcaseMiddleware))
  app.use(unlessStartsWith("/novo", hardcodedRedirectsMiddleware))
  app.use(unlessStartsWith("/novo", localsMiddleware))
  app.use(unlessStartsWith("/novo", backboneErrorHandlerMiddleware))
  app.use(unlessStartsWith("/novo", sameOriginMiddleware))
  app.use(unlessStartsWith("/novo", escapedFragmentMiddleware))
  app.use(unlessStartsWith("/novo", unsupportedBrowserMiddleware))
  app.use(unlessStartsWith("/novo", intercomMiddleware))
  app.use(unlessStartsWith("/novo", pageCacheMiddleware))

  // Sets up mobile marketing signup modal
  app.use(marketingModalsMiddleware)

  if (process.env.NODE_ENV !== "test") {
    app.use(splitTestMiddleware)
  }

  if (process.env.NODE_ENV === "development") {
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

    // Setup hot-swap loader. See https://github.com/artsy/express-reloadable
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
        "@artsy/cohesion",
        "@artsy/fresnel",
        "@artsy/palette",
        "@artsy/reaction",
        "@artsy/stitch",
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
}
