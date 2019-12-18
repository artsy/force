import { stringify } from "querystring"

export const searchMiddleware = (req, res, next) => {
  const pageParts = req.path.split("/")
  const pageType = pageParts[1]
  if (pageType === "search") {
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
