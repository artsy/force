import React from "react"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "reaction/Apps/Search/routes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"

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
      res.redirect(302, "/")
      return
    }

    try {
      const {
        bodyHTML,
        redirect,
        status,
        headTags,
        styleTags,
        scripts,
      } = await buildServerApp({
        routes,
        url: req.url,
        userAgent: req.header("User-Agent"),
        context: buildServerAppContext(req, res),
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/react_redesign.jade",
        blocks: {
          head: () => <React.Fragment>{headTags}</React.Fragment>,
          body: bodyHTML,
        },
        locals: {
          ...res.locals,
          assetPackage: "search2",
          scripts,
          styleTags,
        },
      })

      res.status(status).send(layout)
    } catch (error) {
      next(error)
    }
  }
)
