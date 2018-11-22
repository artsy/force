import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import express from "express"
import React from "react"
import { Meta } from "./meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

export const app = express()

const index = async (req, res, next) => {
  try {
    const { APP_URL, IS_MOBILE } = res.locals.sd

    const { headTags, ServerApp, redirect, scripts } = await buildServerApp({
      routes,
      url: req.url,
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
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <Meta appUrl={APP_URL} headTags={headTags} />,
        body: () => <ServerApp />,
      },
      locals: {
        ...res.locals,
        assetPackage: "collect2",
        bodyClass: IS_MOBILE ? "body-header-fixed body-no-margins" : null,
        scripts,
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
