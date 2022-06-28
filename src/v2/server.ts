import { buildServerApp } from "v2/System/Router/server"
import { getRouteConfig } from "./System/Router/getRouteConfig"
import { renderServerApp } from "./System/Router/renderServerApp"
import express from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import type { NextFunction } from "express"
import { adminServerRoutes } from "./Apps/Admin/adminServerRoutes"

const app = express()
const { routes, routePaths } = getRouteConfig()

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  routePaths,
  async (req: ArtsyRequest, res: ArtsyResponse, next: NextFunction) => {
    if (res.locals.cachedPageAvailable) {
      res.send(res.locals.cachedPageData)
      return
    }

    try {
      const { status, redirect, ...rest } = await buildServerApp({
        assetsPath: "/assets",
        loadableFile: "loadable-novo-stats.json",
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

// TODO: Extract into an app file
// Experiment with overwriting OneTrust consent cookie with server-side version
// to get around Safari's 7 day limit for client-side cookies.
app
  .get("/set-tracking-preferences", (req, res) => {
    const { OptanonAlertBoxClosed, OptanonConsent } = req.query

    const cookieConfig = {
      maxAge: 1000 * 60 * 60 * 24 * 365,
      httpOnly: false,
      secure: true,
    }

    if (OptanonAlertBoxClosed !== "undefined") {
      res.cookie("OptanonAlertBoxClosed", OptanonAlertBoxClosed, cookieConfig)
    }

    if (OptanonConsent) {
      res.cookie("OptanonConsent", OptanonConsent, cookieConfig)
    }

    res.send("[Force] Consent cookie set.")
  })
  .use(adminServerRoutes)

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
