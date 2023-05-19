import { buildServerApp } from "System/Router/buildServerApp"
import { getRouteConfig } from "System/Router/getRouteConfig"
import { renderServerApp } from "System/Router/renderServerApp"
import express from "express"
import type {
  ArtsyRequest,
  ArtsyResponse,
} from "Server/middleware/artsyExpress"
import type { NextFunction } from "express"
import { adminServerRoutes } from "Apps/Admin/adminServerRoutes"
import { sitemapsServerApp } from "Apps/Sitemaps/sitemapsServerApp"
import { rssServerApp } from "Apps/RSS/rssServerApp"
import { redirectsServerRoutes } from "Apps/Redirects/redirectsServerRoutes"
import { setTrackingPreferences } from "Server/analytics/segmentOneTrustIntegration/setTrackingPreferences"

const app = express()
const { routes, routePaths } = getRouteConfig()

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    try {
      const { status, redirect, ...rest } = await buildServerApp({
        assetsPath: "/assets",
        loadableFile: "loadable-stats.json",
        loadablePath: "public/assets",
        next,
        req,
        res,
        routes,
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      renderServerApp({ req, res, ...rest })
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
)

/**
 * Mount server-side Express routes
 */

app
  .get("/set-tracking-preferences", setTrackingPreferences)
  .use(adminServerRoutes)
  .use(sitemapsServerApp)
  .use(rssServerApp)
  // Should be last
  .use(redirectsServerRoutes)

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
