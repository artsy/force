import React from "react"
import ReactDOM from "react-dom"
import { SystemContextProvider } from "v2/Artsy"
import CollectorIntent from "v2/Components/Onboarding/Steps/CollectorIntent"
import Artists from "v2/Components/Onboarding/Steps/Artists"
import Genes from "v2/Components/Onboarding/Steps/Genes"
import Budget from "v2/Components/Onboarding/Steps/Budget"
import { data as sd } from "sharify"
import { createBrowserRouter, makeRouteConfig, Route } from "found"
import { track } from "v2/Artsy"
import Events from "v2/Utils/Events"

const bootstrapData = window.__BOOTSTRAP__

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <>
      <Route path="/personalize/interests" Component={CollectorIntent} />
      <Route path="/personalize/artists" Component={Artists} />
      <Route path="/personalize/categories" Component={Genes} />
      <Route path="/personalize/budget" Component={Budget} />
    </>
  ),
})

const Onboarding = track(null, {
  dispatch: Events.postEvent,
})(() => {
  return (
    <div>
      <SystemContextProvider {...bootstrapData} user={sd.CURRENT_USER}>
        <BrowserRouter />
      </SystemContextProvider>
    </div>
  )
})

ReactDOM.hydrate(<Onboarding />, document.getElementById("react-root"))
