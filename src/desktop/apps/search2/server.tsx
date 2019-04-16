import { stitch } from "@artsy/stitch"
import express, { Request, Response, NextFunction } from "express"
import { stringify } from "querystring"

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
        layout: "../../components/main_layout/templates/react_redesign.jade",
        locals: {
          ...res.locals,
          assetPackage: "search2",
        },
      })

      res.send(layout)
    } catch (error) {
      next(error)
    }
  }
)
