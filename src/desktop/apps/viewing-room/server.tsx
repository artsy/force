import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes as viewingRoomRoutes } from "reaction/Apps/ViewingRoom/routes"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"
import { skipIfClientSideRoutingEnabled } from "desktop/components/split_test/skipIfClientSideRoutingEnabled"
import adminOnly from "desktop/lib/admin_only"

export const app = express()

app.get(
  "/viewing-room*",
  skipIfClientSideRoutingEnabled,
  adminOnly,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const {
        bodyHTML,
        redirect,
        status,
        headTags,
        styleTags,
        scripts,
      } = await buildServerApp({
        context: buildServerAppContext(req, res),
        routes: viewingRoomRoutes,
        url: req.url,
        userAgent: req.header("User-Agent"),
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
          assetPackage: "viewing-room",
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
