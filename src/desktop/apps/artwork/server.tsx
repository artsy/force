import React from "react"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "reaction/Apps/Artwork/routes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import express, { Request, Response, NextFunction } from "express"
import request from "superagent"

const Artwork = require("desktop/models/artwork.coffee")

export const app = express()

export const handleDownload = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const artwork = new Artwork({ id: req.params.artworkID })
  await artwork.fetch({
    cache: true,
  })

  if (artwork.isDownloadable(req.user)) {
    const imageRequest = request.get(artwork.downloadableUrl(req.user))
    if (req.user) {
      imageRequest.set("X-ACCESS-TOKEN", req.user.get("accessToken"))
    }
    req
      .pipe(
        imageRequest,
        { end: false }
      )
      .pipe(res)
  } else {
    const error: any = new Error("Not authorized to download this image.")
    error.status = 403
    next(error)
  }
}

app.get("/artwork/:artworkID/download/:filename", handleDownload)

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
