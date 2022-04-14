import express from "express"
import { middleware as stitchMiddleware } from "@artsy/stitch/dist/internal/middleware"
import * as globalReactModules from "desktop/components/react/stitch_components"

const app = express()

/**
 * -----------------------------------------------------------------------------
 *
 * Developers! Wait!
 *
 * Before adding a new app to this file, can it live in  `v2/routes?
 * In most cases, apps built after Jan 2020 can take advantage of our Relay-based
 * SSR router (v2/server) which requires no additional server-side setup.
 *
 * ----------------------------------------------------------------------------
 */

/**
 * Configure stitch SSR functionality. Mounted here (rather than in setup) so
 * changes to stitched code can be hot reloaded.
 *
 * @see https://github.com/artsy/stitch/tree/master/src/internal for more info.
 */
app.use(
  stitchMiddleware({
    // @ts-ignore
    modules: globalReactModules,
    wrapper: globalReactModules.StitchWrapper,
  })
)

/**
 * NOTE: App order matters as some apps establish logic that is shared inside
 * of subapps. Apps with hardcoded routes or "RESTful" routes.
 */

app.use(require("./apps/editorial_features"))
// FIXME: Remove once JSONPage + new app shell is worked out
app.use(require("./apps/art_keeps_going/server").app)
app.use(require("./apps/eoy_2016"))
app.use(require("./apps/partnerships"))
app.use(require("./apps/jobs"))
app.use(require("./apps/personalize"))
app.use(require("./apps/press"))

app.use(require("./apps/static"))
app.use(require("./apps/clear_cache"))
app.use(require("./apps/sitemaps"))
app.use(require("./apps/rss"))
app.use(require("./apps/dev"))
app.use(require("./apps/article").app)

// Non-profile dynamic vanity url apps
app.use(require("./apps/articles").app)
app.use(require("./apps/shortcuts"))

// Apps that need to fetch a profile.
// Because profile routes are usually top-level and use wild-card matchers in their routers,
// it's best to keep them last. Otherwise it's easy for these to unexpectedly
// catch conventional app routes.
app.use(require("./apps/profile"))
app.use(require("./apps/partner_redirect").app)
app.use(require("./apps/partner2"))
app.use(require("./apps/partner"))
app.use(require("./apps/fair_redirect").app)
app.use(require("./apps/fair_organizer_redirect").app)

// Export for hot reloading
module.exports = app
export default app
