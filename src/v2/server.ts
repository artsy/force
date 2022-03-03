import { buildServerApp } from "v2/System/Router/server"
import { getRouteConfig } from "./System/Router/getRouteConfig"
import { renderServerApp } from "./System/Router/renderServerApp"
import express from "express"
import type { ArtsyRequest, ArtsyResponse } from "lib/middleware/artsyExpress"
import type { NextFunction } from "express"

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

      if (res.locals.hasRedirected) {
        return
      }

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

// This export form is required for express-reloadable
// TODO: Remove when no longer needed for hot reloading
module.exports = app
export default app
