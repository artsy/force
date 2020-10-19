import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { data as sd } from "sharify"
// TODO: Look into dropping in favor of Webpack dynamic imports
import { loadableReady } from "@loadable/component"

const mediator = require("desktop/lib/mediator.coffee")

buildClientApp({
  routes: getAppNovoRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator: mediator.default ? mediator.default : mediator,
  } as any,
})
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .catch(error => {
    console.error(error)
  })

