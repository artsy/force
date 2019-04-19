import { stitch } from "@artsy/stitch"
import express, { Request, Response, NextFunction } from "express"
import { stringify } from "querystring"
import { SearchResultsSkeleton } from "reaction/Apps/Search/Components/SearchResultsSkeleton"
import React from "react"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"

export const app = express()

const maybeShowNewPage = (req, _res, next) => {
  const shouldShowNewPage =
    req.user && req.user.hasLabFeature("New Search Results")

  if (shouldShowNewPage) {
    return next()
  } else {
    return next("route")
  }
}

app.get(
  "/search/:tab?",
  maybeShowNewPage,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.term) {
      if (req.query.q) {
        const query = stringify({ term: req.query.q })
        res.redirect(302, `/search?${query}`)
        return
      } else {
        res.redirect(302, "/")
        return
      }
    }

    const { IS_MOBILE } = res.locals.sd

    try {
      const layout = await stitch({
        basePath: __dirname,
        layout: "templates/index.jade",
        locals: {
          ...res.locals,
          assetPackage: "search2",
        },
        blocks: {
          loadingComponent: _props => {
            return (
              !IS_MOBILE && (
                <StitchWrapper>
                  <SearchResultsSkeleton />
                </StitchWrapper>
              )
            )
          },
        },
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  }
)
