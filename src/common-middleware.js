// Setup sharify
// TODO: Export a function instead of loading on import.
import "./lib/setup_sharify"

import compression from "compression"
import express from "express"
import favicon from "serve-favicon"
import glob from "glob"
import path from "path"
import sharify from "sharify"
import siteAssociation from "artsy-eigen-web-association"

function staticAssetMiddlewares(app) {
  // Mount static assets from root public folder
  app.use(express.static("public"))

  // Mount static assets from sub-app /app `public` folders
  glob
    .sync(`${__dirname}/{public,{desktop,mobile}/**/public}`)
    .forEach(folder => {
      app.use(express.static(folder))
    })

  app.use(
    favicon(path.resolve(__dirname, "mobile/public/images/favicon.ico"))
  )
  app.use("/(.well-known/)?apple-app-site-association", siteAssociation)
}

export default function commonMiddlewareSetup(app) {
  // Inject sharify data and asset middleware before any app code so that when
  // crashing errors occur we'll at least get a 500 error page.
  app.use(sharify)

  // Ensure all responses are gzip compressed
  app.use(compression())

  // Static assets
  staticAssetMiddlewares(app)
}
