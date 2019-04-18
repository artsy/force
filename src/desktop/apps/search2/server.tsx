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

    try {
      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/search_results.jade",
        locals: {
          ...res.locals,
          assetPackage: "search2",
        },
        blocks: {
          skeleton: _props => {
            return (
              <StitchWrapper>
                <SearchResultsSkeleton />
              </StitchWrapper>
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
