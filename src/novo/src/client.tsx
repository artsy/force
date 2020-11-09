import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { loadableReady } from "@loadable/component"

buildClientApp({
  routes: getAppNovoRoutes(),
})
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .catch(error => {
    console.error(error)
  })
