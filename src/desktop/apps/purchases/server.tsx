import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Purchase/routes"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"

export const app = express()

app.get(
  "/user/purchases",
  skipIfClientSideRoutingEnabled,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
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
          assetPackage: "purchase",
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
