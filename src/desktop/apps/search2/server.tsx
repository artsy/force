import express, { Request, Response, NextFunction } from "express"
import { stringify } from "querystring"

export const app = express()

app.set("views", __dirname + "/templates")
app.set("view engine", "jade")

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
  async (req: Request, res: Response, _next: NextFunction) => {
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

    res.render("index")
  }
)
