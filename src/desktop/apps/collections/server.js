import { buildServerApp } from "reaction/Artsy/Router/server"
import { stitch } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collections/routes"
import express from "express"
import { buildServerAppContext } from "desktop/lib/buildServerAppContext"
import adminOnly from "desktop/lib/admin_only"

const app = (module.exports = express())

app.get("/collections", adminOnly, async (req, res, next) => {
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
        head: () => null,
        body: ServerApp,
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
})

export default app
