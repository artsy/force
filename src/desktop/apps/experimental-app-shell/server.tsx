import React from "react"
import express, { Request } from "express"
import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/server"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import { SearchResultsSkeleton } from "reaction/Apps/Search/Components/SearchResultsSkeleton"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"
import { artistMiddleware } from "./artist/middleware"
import { searchMiddleware } from "./search/middleware"
import { handleArtworkImageDownload } from "./artwork/middleware"

export const app = express()

// Non-Reaction routes
app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)

app.get(
  "/*",
  searchMiddleware,
  artistMiddleware,
  async (req: Request, res, next) => {
    try {
      const pageParts = req.path.split("/")
      const pageType = pageParts[1]
      let serverApp

      // Search intentionally bypasses SSR
      if (pageType !== "search") {
        serverApp = await buildServerApp({
          context: buildServerAppContext(req, res),
          routes: getAppRoutes(),
          url: req.url,
          userAgent: req.header("User-Agent"),
        })
      }

      const { styleTags, scripts, redirect, bodyHTML, headTags } =
        serverApp || {}

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
        layout: "../../components/main_layout/templates/react_blank_index.jade",
        blocks,
        locals: {
          ...res.locals,
          scripts,
          styleTags,
          pageType,
          assetPackage: "experimental-app-shell",
        },
      })

      res.status(status).send(layout)
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
)
