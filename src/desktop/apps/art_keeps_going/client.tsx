import { buildClientApp } from "v2/Artsy/Router/client"
import { data as sd } from "sharify"
import { routes } from "v2/Apps/FeatureAKG/routes"
import React from "react"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

buildClientApp({
  routes: routes,
  context: {
    injectedData: sd.JSON_PAGE_DATA,
  },
})
  .then(({ ClientApp }) => {
    loadableReady(() => {
      ReactDOM.hydrate(<ClientApp />, document.getElementById("react-root"))
    })
  })
  .catch(error => {
    console.error(error)
  })

if (module.hot) {
  module.hot.accept()
}
