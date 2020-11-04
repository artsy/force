import { extend } from "lodash"
import artsyPassport from "@artsy/passport"
import artsyXapp from "@artsy/xapp"
import bodyParser from "body-parser"
import path from "path"
import cache from "./cache"
import CurrentUser from "./current_user"
import config from "../config"
import { unlessStartsWith } from "./middleware/unless"
import addIntercomUserHash from "./middleware/intercom"
import assetMiddleware from "./middleware/assetMiddleware"
import backboneErrorHelper from "./middleware/backbone_error_helper"
import csrfTokenMiddleware from "./middleware/csrfTokenMiddleware"
import downcase from "./middleware/downcase"
import escapedFragmentMiddleware from "./middleware/escaped_fragment"
import hardcodedRedirects from "./middleware/hardcoded_redirects"
import localsMiddleware from "./middleware/locals"
import marketingModals from "./middleware/marketing_modals"
import pageCacheMiddleware from "./middleware/pageCacheMiddleware"
import proxyReflection from "./middleware/proxy_to_reflection"
import sameOriginMiddleware from "./middleware/same_origin"
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
  // TODO: Verify if this must occur after passport and after cookie parser
  app.use(csrfTokenMiddleware)

  // Redirect requests before they even have to deal with Force routing
  app.use(unlessStartsWith("/novo", downcase))
  app.use(unlessStartsWith("/novo", hardcodedRedirects))
  app.use(unlessStartsWith("/novo", localsMiddleware))
  app.use(unlessStartsWith("/novo", backboneErrorHelper))
  app.use(unlessStartsWith("/novo", sameOriginMiddleware))
  app.use(unlessStartsWith("/novo", escapedFragmentMiddleware))
  app.use(unlessStartsWith("/novo", unsupportedBrowserCheckMiddleware))
  app.use(unlessStartsWith("/novo", addIntercomUserHash))
  app.use(unlessStartsWith("/novo", pageCacheMiddleware))

  // Sets up mobile marketing signup modal
  app.use(marketingModals)

  if (process.env.NODE_ENV !== "test") {
    app.use(splitTestMiddleware)
  }

  if (process.env.NODE_ENV === "development") {
    // Development servers
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
}
