import { buildServerApp } from "reaction/Artsy/Router"
import { renderLayout } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import { Meta } from "./meta.tsx"
import mediator from "desktop/lib/mediator.coffee"
import express from "express"
import React from "react"

const app = (module.exports = express())

export const index = async (req, res, next) => {
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

app.get("/collect2/:medium?", index)

export default app
