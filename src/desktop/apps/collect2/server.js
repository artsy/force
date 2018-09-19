import { buildServerApp } from "reaction/Artsy/Router"
import { renderLayout } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import express from "express"
import React from "react"
import maybeShowOldCollect from "./maybe_show_old_collect"
import mediator from "desktop/lib/mediator.coffee"
import { Meta } from "./meta.tsx"

const app = (module.exports = express())

const index = async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()
    const { APP_URL, IS_MOBILE } = res.locals.sd

    const { ServerApp, redirect } = await buildServerApp({
      routes,
      url: req.url,
      context: {
        initialMatchingMediaQueries: IS_MOBILE ? ["xs"] : undefined,
        user,
        mediator,
      },
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    // Render layout
    const layout = await renderLayout({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_redesign.jade",
      config: {
        styledComponents: true,
      },
      blocks: {
        head: () => <Meta appUrl={APP_URL} />,
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
