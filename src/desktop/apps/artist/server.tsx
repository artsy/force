import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Artist/routes"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"

export const app = express()

app.get(
  "/artist/:artistID*",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = req.user && req.user.toJSON()

      const context = buildServerAppContext(req, res, {})
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
        context,
      })

      if (redirect) {
        res.redirect(302, redirect.url)
        return
      }

      const { APP_URL, IS_MOBILE, REFERRER } = res.locals.sd
      const isExternalReferer = !(REFERRER && REFERRER.includes(APP_URL))

      res.locals.sd.ARTIST_PAGE_CTA_ENABLED =
        !user && isExternalReferer && !IS_MOBILE
      res.locals.sd.ARTIST_PAGE_CTA_ARTIST_ID = req.params.artistID

      // Render layout
      const layout = await stitch({
        basePath: __dirname,
        layout: "../../components/main_layout/templates/react_redesign.jade",
        blocks: {
          head: () => <React.Fragment>{headTags}</React.Fragment>,
          body: bodyHTML,
        },
        locals: {
          ...res.locals,
          assetPackage: "artist",
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
