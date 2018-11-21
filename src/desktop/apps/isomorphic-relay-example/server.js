import express from "express"
import adminOnly from "desktop/lib/admin_only"
import { buildServerApp } from "reaction/Artsy/Router/server"
import { routes } from "./routes"
import { stitch } from "@artsy/stitch"
import { Meta } from "./components/Meta"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import React from "react"

const app = (module.exports = express())

app.get("/isomorphic-relay-example*", adminOnly, async (req, res, next) => {
  try {
    const {
      ServerApp,
      redirect,
      status,
      headTags,
      scripts,
    } = await buildServerApp({
      routes,
      url: req.url,
      context: buildServerAppContext(req, res),
    })

    if (redirect) {
      res.redirect(302, redirect.url)
      return
    }

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_index.jade",
      config: {
        styledComponents: true,
      },
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
      },
    })

    res.status(status).send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
