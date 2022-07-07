import express from "express"

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
 * NOTE: App order matters as some apps establish logic that is shared inside
 * of subapps. Apps with hardcoded routes or "RESTful" routes.
 */
app.use(require("./apps/sitemaps"))
app.use(require("./apps/rss"))

// Non-profile dynamic vanity url apps
app.use(require("./apps/shortcuts"))

// Apps that need to fetch a profile.
// Because profile routes are usually top-level and use wild-card matchers in their routers,
// it's best to keep them last. Otherwise it's easy for these to unexpectedly
// catch conventional app routes.
app.use(require("./apps/profile"))
app.use(require("./apps/partner_redirect").app)
app.use(require("./apps/fair_redirect").app)
app.use(require("./apps/fair_organizer_redirect").app)

// Export for hot reloading
module.exports = app
export default app
