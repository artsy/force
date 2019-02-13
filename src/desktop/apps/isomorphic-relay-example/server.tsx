import React from "react"
import express from "express"
import adminOnly from "desktop/lib/admin_only"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "./routes"
import { stitch } from "@artsy/stitch"
import { Meta } from "./components/Meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"

export const app = express()

app.get("/isomorphic-relay-example*", adminOnly, async (req, res, next) => {
  try {
    const {
      ServerApp,
      headTags,
      redirect,
      status,
      scripts,
      styleTags,
    } = await buildServerApp({
      routes: routes as any,
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
      layout: "../../components/main_layout/templates/react_index.jade",
      blocks: {
        head: () => (
          <React.Fragment>
            {headTags}
            <Meta />
          </React.Fragment>
        ),
        body: ServerApp,
      },
      locals: {
        ...res.locals,
        assetPackage: "relay",
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
