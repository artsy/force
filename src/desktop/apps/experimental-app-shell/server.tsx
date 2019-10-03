import React from "react"
import express from "express"
import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/server"
import { getAppRoutes } from "reaction/Apps/getAppRoutes"
import { stitch } from "@artsy/stitch"

export const app = express()

app.get("/*", async (req, res, next) => {
  try {
    const { bodyHTML, styleTags, headTags } = await buildServerApp({
      routes: getAppRoutes(),
      url: req.url,
    })

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_blank_index.jade",
      blocks: {
        body: bodyHTML,
        head: () => <>{headTags}</>,
      },
      locals: {
        ...res.locals,
        // assetPackage: "experimental-app-shell",
        styleTags,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
