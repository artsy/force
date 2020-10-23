import "desktop/lib/webpackPublicPath"

import React from "react"
import ReactDOM from "react-dom"
import { buildClientApp } from "v2/Artsy/Router/client"
import { getAppNovoRoutes } from "v2/Apps/getAppNovoRoutes"
import { data as sd } from "sharify"
import { loadableReady } from "@loadable/component"

import { mediator } from "desktop/lib/mediator"

buildClientApp({
  routes: getAppNovoRoutes(),
  context: {
    user: sd.CURRENT_USER,
    mediator,
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
