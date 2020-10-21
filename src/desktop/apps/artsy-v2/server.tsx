import React from "react"
import express, { Request } from "express"
import { buildServerApp } from "v2/Artsy/Router/server"
import { getAppRoutes } from "v2/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"
import { flatten } from "lodash"

import { handleArtworkImageDownload } from "./apps/artwork/artworkMiddleware"
import { artistMiddleware } from "./apps/artist/artistMiddleware"
import { userRequiredMiddleware } from "./middleware/userRequiredMiddleware"
import { searchMiddleware } from "./apps/search/searchMiddleware"
import { handleCollectionToArtistSeriesRedirect } from "./apps/collection/collectionMiddleware"
import { getContextPageFromReq } from "lib/getContextPage"

export const app = express()

const isAllowedRoute = route => route !== "/" && route !== "*"

const topLevelMetaRoute = getAppRoutes()[0]
const allRoutes = flatten(
  topLevelMetaRoute.children.map(app => {
    // Only supports one level of nesting per app.
    // For instance, these are tabs on the artist page, etc.
    const allChildPaths = app.children
      ?.map(child => child.path)
      .filter(isAllowedRoute)

    return allChildPaths
      ? allChildPaths.map(child => app.path + "/" + child).concat(app.path)
      : app.path
  })
)

/**
 * Mount non-Reaction routes that are relevant to specific global router routes
 */
app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)
app.get("/collection/:collectionSlug", handleCollectionToArtistSeriesRedirect)

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  allRoutes,
  userRequiredMiddleware,

  /**
   * Mount middleware for handling server-side portions of apps mounted into
   * global router.
   */
  artistMiddleware,

  // Search exits early and renders its own page, since SSR is not needed
  searchMiddleware,

  /**
   * Route handler
   */
  async (req: Request, res, next) => {
    try {
      const { pageType } = getContextPageFromReq(req)
      const {
        status,
        styleTags,
        scripts,
        redirect,
        bodyHTML,
        headTags,
      } = await buildServerApp({
        req,
        res,
        routes: getAppRoutes(),
      })

      if (redirect) {
        res.redirect(status ?? 302, redirect.url)
        return
      }

      // Turn off pre-fetching, since those will be intercepted
      // and routed client-side.
      res.locals.sd.ENABLE_INSTANT_PAGE = false

      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/artsy_v2.jade",
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
      console.error(error)
      next(error)
    }
  }
)
