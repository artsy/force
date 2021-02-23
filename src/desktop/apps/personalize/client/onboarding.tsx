import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import createHistory from "history/createBrowserHistory"
import { SystemContextProvider } from "v2/Artsy"
import { Wizard } from "v2/Components/Onboarding/Wizard"
import { data as sd } from "sharify"

const bootstrapData = window.__BOOTSTRAP__
const history = createHistory()

history.listen(ev => {
  window.scrollTo(0, 0)

  // track pageviews when react-router updates the url
  window.analytics.page(
    { path: ev.pathname },
    { integrations: { Marketo: false } }
  )
})

// Start app
ReactDOM.hydrate(
  <Router history={history}>
    <SystemContextProvider {...bootstrapData} user={sd.CURRENT_USER}>
      <Wizard />
    </SystemContextProvider>
  </Router>,
  document.getElementById("react-root")
)
