import React from "react"
import { stringify } from "querystring"
import { SearchResultsSkeleton } from "reaction/Apps/Search/Components/SearchResultsSkeleton"
import { StitchWrapper } from "desktop/components/react/stitch_components/StitchWrapper"
import { stitch } from "@artsy/stitch"
import { getPageType } from "../../utils/getPageType"

export const searchMiddleware = async (req, res, next) => {
  const { pageType } = getPageType(req)

  if (pageType === "search") {
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

      /**
       * Search intentionally bypasses SSR, but we still need to inject the
       * experimental-app-shell asset into the page. Because of bundle splitting
       * we now get that back dynamically from `buildServerApp` below.
       *
       * @see https://github.com/artsy/reaction/blob/master/src/Artsy/Router/buildServerApp.tsx#L157
       */
      // Use helper defined in assetMiddleware to return fingerprinted url
      const scriptUrl = res.locals.asset("/assets/experimental-app-shell.js")
      const scripts = `<script async data-chunk="experimental-app-shell" src="${scriptUrl}"></script>`

      // Turn off pre-fetching, since those will be intercepted
      // and routed client-side.
      res.locals.sd.ENABLE_INSTANT_PAGE = false

      const layout = await stitch({
        basePath: __dirname,
        layout:
          "../../../../components/main_layout/templates/experimental_app_shell.jade",
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
          scripts,
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
    } catch (error) {
      console.log(error)
      next(error)
    }
  }
  next()
}
