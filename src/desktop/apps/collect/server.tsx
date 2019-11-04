import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { collectRoutes } from "reaction/Apps/Collect2/collectRoutes"
import express from "express"
import React from "react"
import { Meta } from "./meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

export const app = express()

const index = async (req, res, next) => {
  try {
    const { APP_URL, IS_MOBILE } = res.locals.sd

    const {
      headTags,
      bodyHTML,
      redirect,
      scripts,
      styleTags,
    } = await buildServerApp({
      routes: collectRoutes,
      url: req.url,
      userAgent: req.header("User-Agent"),
      context: buildServerAppContext(req, res),
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
        head: () => <Meta appUrl={APP_URL} headTags={headTags} />,
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "collect",
        bodyClass: IS_MOBILE ? "body-header-fixed body-no-margins" : null,
        scripts,
        styleTags,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

app.get("/collect", index)
app.get("/collect/:medium?", index)
app.get("/collection/:slug", index)
app.get("/collections", index)
