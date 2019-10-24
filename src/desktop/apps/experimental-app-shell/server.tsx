import React from "react"
import express from "express"
import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/server"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import request from "superagent"

const Artwork = require("desktop/models/artwork.coffee")

export const app = express()

app.get("/*", async (req, res, next) => {
  try {
    const {
      bodyHTML,
      headTags,
      redirect,
      status,
      styleTags,
      scripts,
    } = await buildServerApp({
      context: buildServerAppContext(req, res),
      routes: getAppRoutes(),
      url: req.url,
      userAgent: req.header("User-Agent"),
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_blank_index.jade",
      blocks: {
        body: bodyHTML,
        head: () => <>{headTags}</>,
      },
      locals: {
        ...res.locals,
        assetPackage: "experimental-app-shell",
        scripts,
        styleTags,
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})

// Artwork Page

export const handleArtworkImageDownload = async (req, res, next) => {
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

app.get("/artwork/:artworkID/download/:filename", handleArtworkImageDownload)
