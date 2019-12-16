import { stitch } from "@artsy/stitch"
import express, { Request, Response, NextFunction } from "express"
import { stringify } from "querystring"
import { SearchResultsSkeleton } from "reaction/Apps/Search/Components/SearchResultsSkeleton"
import React from "react"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"

export const app = express()

app.get(
  "/search/:tab?",
  skipIfClientSideRoutingEnabled,
  async (req: Request, res: Response, next: NextFunction) => {
    if (!req.query.term) {
      if (req.query.q) {
        const query = stringify({ term: req.query.q })
        res.locals.sd.searchQuery = req.query.q
        res.redirect(302, `/search?${query}`)
        return
      } else {
        res.redirect(302, "/")
        return
      }
    } else {
      res.locals.sd.searchQuery = req.query.term
    }
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
