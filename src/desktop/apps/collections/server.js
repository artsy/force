import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import express from "express"
import React from "react"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

const app = (module.exports = express())

const index = async (req, res, next) => {
  try {
    const { IS_MOBILE } = res.locals.sd

    const { ServerApp, redirect } = await buildServerApp({
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
        // head: () => <Meta appUrl={APP_URL} headTags={headTags} />,
        body: () => <ServerApp />,
      },
      locals: {
        ...res.locals,
        assetPackage: "collections",
        bodyClass: IS_MOBILE ? "body-header-fixed body-no-margins" : null,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
}

app.get("/collections", index)

export default app
