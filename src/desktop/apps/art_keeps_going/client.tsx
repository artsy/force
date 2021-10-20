import { buildClientApp } from "v2/System/Router/client"
import { data as sd } from "sharify"
import { featureAKGRoutes } from "v2/Apps/FeatureAKG/featureAKGRoutes"
import ReactDOM from "react-dom"
import { loadableReady } from "@loadable/component"

buildClientApp({
  context: {
    injectedData: sd.JSON_PAGE_DATA,
  },
  routes: featureAKGRoutes,
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
