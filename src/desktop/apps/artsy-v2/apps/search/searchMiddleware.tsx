import React from "react"
import { stringify } from "querystring"
import { SearchResultsSkeleton } from "v2/Apps/Search/Components/SearchResultsSkeleton"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"
import { stitch } from "@artsy/stitch"
import { getPageTypeFromReq } from "lib/getPageType"
import { OwnerType } from "@artsy/cohesion"

export const searchMiddleware = async (req, res, next) => {
  const { pageType } = getPageTypeFromReq(req)

  if (pageType === OwnerType.search) {
    try {
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

      // Turn off pre-fetching, since those will be intercepted
      // and routed client-side.
      res.locals.sd.ENABLE_INSTANT_PAGE = false

      const layout = await stitch({
        basePath: __dirname,
        layout: "../../../../components/main_layout/templates/artsy_v2.jade",
        blocks: {
          loadingComponent: _props => {
            return (
              <StitchWrapper>
                <SearchResultsSkeleton />
              </StitchWrapper>
            )
          },
        },
        locals: {
          ...res.locals,
          pageType,
        },
      })

      const status = 200
      res.locals.PAGE_CACHE = {
        status,
        key: req.url,
        html: layout,
      }
      res.status(status).send(layout)
      return
    } catch (error) {
      console.error(error)
      next(error)
    }
  }
  next()
}
