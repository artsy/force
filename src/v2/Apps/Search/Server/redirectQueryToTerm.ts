import { stringify } from "qs"

export function redirectQueryToTerm({ req, res }) {
  if (req.query.term) {
    res.locals.sd.searchQuery = req.query.term
  } else {
    if (req.query.q) {
      const query = stringify({ term: req.query.q })
      res.locals.sd.searchQuery = req.query.q
      res.redirect(302, `/search?${query}`)
    } else {
      res.redirect(302, "/")
    }
  }
}
