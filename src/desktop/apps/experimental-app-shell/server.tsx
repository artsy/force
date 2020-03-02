import React from "react"
import express, { Request } from "express"
import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/server"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"

import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import { handleArtworkImageDownload } from "./apps/artwork/artworkMiddleware"
import { artistMiddleware } from "./apps/artist/artistMiddleware"
import { bidderRegistrationMiddleware } from "./apps/auction/bidderRegistrationMiddleware"
import { confirmBidMiddleware } from "./apps/auction/confirmBidMiddleware"
import { orderMiddleware } from "./apps/order/orderMiddleware"
import { searchMiddleware } from "./apps/search/searchMiddleware"

export const app = express()

/**
 * Mount non-Reaction routes that are relevant to specific global router routes
 */
app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  "/*",
  (_req, res, next) => {
    const isExperiment = res.locals.sd.CLIENT_NAVIGATION_V4 === "experiment"

    if (!isExperiment) {
      return next("route")
    }
    return next()
  },
  /**
   * Mount middleware for handling server-side portions of apps mounted into
   * global router.
   */
  artistMiddleware,
  bidderRegistrationMiddleware,
  confirmBidMiddleware,
  orderMiddleware,

  // Search exits early and renders its own page, since SSR is not needed
  searchMiddleware,

  /**
   * Route handler
   */
  async (req: Request, res, next) => {
    try {
      const pageParts = req.path.split("/")
      const pageType = pageParts[1]

      const {
        status,
        styleTags,
        scripts,
        redirect,
        bodyHTML,
        headTags,
      } = await buildServerApp({
        context: buildServerAppContext(req, res, {
          EXPERIMENTAL_APP_SHELL: true,
        }),
        routes: getAppRoutes(),
        url: req.url,
        userAgent: req.header("User-Agent"),
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      // Turn off pre-fetching, since those will be intercepted
      // and routed client-side.
      res.locals.sd.ENABLE_INSTANT_PAGE = false

      const layout = await stitch({
        basePath: __dirname,
        layout:
          "../../components/main_layout/templates/experimental_app_shell.jade",
        blocks: {
          body: bodyHTML,
          head: () => <>{headTags}</>,
        },
        locals: {
          ...res.locals,
          scripts,
          styleTags,
          pageType,

          /**
           * NOTE: The asset package isn't needed here because we're dynamically
           * injecting it into `scripts` array in buildServerApp.tsx, which gets
           * mounted directly in the template with other split bundles.
           *
           * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/buildServerApp.tsx
           */
          // assetPackage: "experimental-app-shell",
        },
      })

      res.locals.PAGE_CACHE = { status, key: req.url, html: layout }
      res.status(status).send(layout)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)
