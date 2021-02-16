import { stringify } from "qs"

export const searchMiddleware = async (req, res, next) => {
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

  next()
}
