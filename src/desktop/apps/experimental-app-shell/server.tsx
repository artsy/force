import React from "react"
import express, { Request } from "express"
import {
  buildServerApp,
  ServerAppResolve,
} from "@artsy/reaction/dist/Artsy/Router/server"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import { SearchResultsSkeleton } from "reaction/Apps/Search/Components/SearchResultsSkeleton"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"

import { handleArtworkImageDownload } from "./artwork/artworkMiddleware"
import { artistMiddleware } from "./artist/artistMiddleware"
import { bidderRegistrationMiddleware } from "./auction/bidderRegistrationMiddleware"
import { confirmBidMiddleware } from "./auction/confirmBidMiddleware"
import { orderMiddleware } from "./order/orderMiddleware"
import { searchMiddleware } from "./search/middleware"

export const app = express()

// Non-Reaction routes
app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)

/**
 * Mount routes that will connect to global SSR router
 */
app.get(
  "/*",

  /**
   * Mount middleware for handling server-side portions of apps mounted into
   * global router.
   */
  artistMiddleware,
  bidderRegistrationMiddleware,
  confirmBidMiddleware,
  orderMiddleware,
  searchMiddleware,

  /**
   * Route handler
   */
  async (req: Request, res, next) => {
    try {
      const pageParts = req.path.split("/")
      const pageType = pageParts[1]
      let serverApp: ServerAppResolve = {}

      /**
       * Search intentionally bypasses SSR, but we still need to inject the
       * experimental-app-shell asset into the page. Because of bundle splitting
       * we now get that back dynamically from `buildServerApp` below.
       *
       * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/buildServerApp.tsx#L157
       */
      if (pageType === "search") {
        // Use helper defined in assetMiddleware to return fingerprinted url
        const scriptUrl = res.locals.asset("/assets/experimental-app-shell.js")
        serverApp.scripts = `<script async data-chunk="experimental-app-shell" src="${scriptUrl}"></script>`
      } else {
        serverApp = await buildServerApp({
          context: buildServerAppContext(req, res),
          routes: getAppRoutes(),
          url: req.url,
          userAgent: req.header("User-Agent"),
        })
      }

      const { styleTags, scripts, redirect, bodyHTML, headTags } = serverApp

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      // Turn off pre-fetching, since those will be intercepted
      // and routed client-side.
      res.locals.sd.ENABLE_INSTANT_PAGE = false

      let status
      let blocks
      // Search-specific loading state and skeleton.
      if (pageType === "search") {
        status = 200
        blocks = {
          loadingComponent: _props => {
            return (
              <StitchWrapper>
                <SearchResultsSkeleton />
              </StitchWrapper>
            )
          },
        }
      } else {
        blocks = {
          body: bodyHTML,
          head: () => <>{headTags}</>,
        }
        status = serverApp.status
      }

      const layout = await stitch({
        basePath: __dirname,
        layout:
          "../../components/main_layout/templates/experimental_app_shell.jade",
        blocks,
        locals: {
          ...res.locals,
          scripts,
          styleTags,
          pageType,

          // TODO: Follow up with Justin on stripe include in scripts.jade
          // template. Right now the order app explicitly sets this to true,
          // but looking over there it seems we're already including it on
          // every page, with `async` and `defer`.
          // options: {
          //   stripev3: true, // for order app
          // },

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
