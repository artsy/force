import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import express from "express"
import React from "react"
import { maybeShowOldCollect } from "./maybeShowOldCollect"
import { Meta } from "./meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

const app = (module.exports = express())

const index = async (req, res, next) => {
  try {
    const { APP_URL } = res.locals.sd

    const { ServerApp, redirect } = await buildServerApp({
      routes,
      url: req.url,
      context: buildServerAppContext(req, res),
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    const medium = req.params.medium && req.params.medium.replace(/-/gi, " ")

    // Render layout
    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <Meta appUrl={APP_URL} medium={medium} />,
        body: () => <ServerApp />,
      },
      locals: {
        ...res.locals,
        assetPackage: "collect2",
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

app.get("/collect", maybeShowOldCollect, index)
app.get("/collect/:medium?", maybeShowOldCollect, index)

export default app
