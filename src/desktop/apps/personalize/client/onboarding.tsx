import ReactDOM from "react-dom"
import { SystemContextProvider } from "v2/System"
import CollectorIntent from "v2/Components/Onboarding/Steps/CollectorIntent"
import { ArtistsStep } from "v2/Components/Onboarding/ArtistsStep"
import { GenesStep } from "v2/Components/Onboarding/GenesStep"
import Budget from "v2/Components/Onboarding/Steps/Budget"
import { data as sd } from "sharify"
import { createBrowserRouter, makeRouteConfig, Route } from "found"
import { track } from "v2/System"
import Events from "v2/Utils/Events"

const bootstrapData = window.__BOOTSTRAP__

const BrowserRouter = createBrowserRouter({
  routeConfig: makeRouteConfig(
    <>
      <Route path="/personalize/interests" Component={CollectorIntent} />
      <Route path="/personalize/artists" Component={ArtistsStep} />
      <Route path="/personalize/categories" Component={GenesStep} />
      <Route path="/personalize/budget" Component={Budget} />
    </>
  ),
})

// @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
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
