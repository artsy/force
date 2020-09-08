import React from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import createHistory from "history/createBrowserHistory"
import Cookies from "cookies-js"

import { SystemContextProvider } from "v2/Artsy"
import { Wizard } from "v2/Components/Onboarding/Wizard"
import { data as sd } from "sharify"

const bootstrapData = window.__BOOTSTRAP__

let redirectTo = "/"
// Check the cookie for a destination
if (Cookies.get("destination")) {
  redirectTo = Cookies.get("destination")
  Cookies.expire("destination")

  // Also check the redirectTo from query params
} else if (bootstrapData.redirectTo) {
  redirectTo = bootstrapData.redirectTo
}

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
      <Wizard redirectTo={redirectTo} />
    </SystemContextProvider>
  </Router>,
  document.getElementById("react-root")
)
