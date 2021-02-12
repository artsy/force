import { getContextPageFromReq } from "lib/getContextPage"
import { OwnerType } from "@artsy/cohesion"
import { stringify } from "qs"

export const searchMiddleware = async (req, res, next) => {
  const { pageType } = getContextPageFromReq(req)

  if (pageType === OwnerType.search) {
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
  }

  next()
}
