import express from "express"
import { buildServerApp } from "@artsy/reaction/dist/Artsy/Router/server"
// import { appShellRoutes } from "reaction/Artsy/Router/AppShell/routes"
import { stitch } from "@artsy/stitch"

export const app = express()

app.get("/experimental-app-shell*", async (req, res, next) => {
  try {
    const { bodyHTML, styleTags } = await buildServerApp({
      routes: [],
      url: req.url,
    })

    const layout = await stitch({
      basePath: __dirname,
      layout: "../../components/main_layout/templates/react_blank_index.jade",
      blocks: {
        body: bodyHTML,
      },
      locals: {
        ...res.locals,
        assetPackage: "experimental-app-shell",
        styleTags,
      },
    })

    res.send(layout)
  } catch (error) {
    console.log(error)
    next(error)
  }
})
