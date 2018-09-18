import { buildServerApp } from "reaction/Artsy/Router"
import { renderLayout } from "@artsy/stitch"
import { routes } from "reaction/Apps/Collect/routes"
import { Meta } from "./meta.tsx"
import mediator from "desktop/lib/mediator.coffee"
import express from "express"
import React from "react"
import getCollectPageTitle from "../../components/commercial_filter/page_title"

const app = (module.exports = express())

export const index = async (req, res, next) => {
  try {
    const user = req.user && req.user.toJSON()
    const { APP_URL, COLLECT_PAGE_TITLES_URL, IS_MOBILE } = res.locals.sd

    // Maybe get custom page title based on query data
    const collectRawData = await fetch(COLLECT_PAGE_TITLES_URL)
    const collectData = await collectRawData.json()
    const requestFilters = Object.assign({}, req.params, req.query)
    const pageTitle = getCollectPageTitle(requestFilters, collectData)

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
        head: () => <Meta title={pageTitle} appUrl={APP_URL} />,
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
