import React from "react"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "reaction/Apps/Artwork/routes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"

export const app = express()

app.get(
  "/artwork/:artworkID*",
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
          assetPackage: "artwork",
          scripts,
          styleTags,
        },
      })

      res.status(status).send(layout)
    } catch (error) {
      console.log(error)
      if (error.message.includes("Artwork Not Found")) {
        const notFoundError: any = new Error("Artwork Not Found")
        notFoundError.status = 404
        next(notFoundError)
      } else {
        next(error)
      }
    }
  }
)
