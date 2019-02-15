import React from "react"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collections/routes"
import express from "express"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

export const app = express()

app.get("/collections", async (req, res, next) => {
  try {
    const { IS_MOBILE } = res.locals.sd

    const {
      bodyHTML,
      headTags,
      redirect,
      scripts,
      styleTags,
    } = (await buildServerApp({
      routes,
      url: req.url,
      userAgent: req.header("User-Agent"),
      context: buildServerAppContext(req, res),
    })) as any

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      blocks: {
        head: () => <>{headTags}</>,
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "collections",
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
})
