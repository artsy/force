import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { conversationRoutes } from "reaction/Apps/Conversation/routes"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"

export const app = express()

app.get(
  "/user/conversations*",
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
        routes: conversationRoutes,
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
          assetPackage: "conversations",
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
