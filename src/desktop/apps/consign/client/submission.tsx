import analyticsMiddleware from "./analytics_middleware"
import ResponsiveWindow from "../../../components/react/responsive_window"
import SubmissionFlow from "../components/submission_flow"
import reducers from "./reducers"
import createHistory from "history/createBrowserHistory"
import createLogger from "redux-logger"
import stepsConfig from "./steps_config"
import thunkMiddleware from "redux-thunk"
import { Provider } from "react-redux"
import { Redirect, Route, Router, Switch } from "react-router"
import { applyMiddleware, createStore } from "redux"
import { data as sd } from "sharify"
import {
  chooseArtist,
  ignoreRedirectOnAuth,
  updateAuthFormStateAndClearError,
  updateCurrentStep,
  updateLocationFromSubmissionAndFreeze,
  updateStepsAfterCreateUser,
  updateStepsWithUser,
  updateStepsWithoutUser,
} from "./actions"
import { render } from "react-dom"
import { routerMiddleware } from "react-router-redux"
import { SystemContextProvider } from "v2/System"
import queryString from "query-string"

const geo = require("../../../components/geo/index.coffee")

function setupSubmissionFlow() {
  // load google maps for autocomplete
  geo.loadGoogleMaps()
  const history = createHistory()

  const middleware = []

  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  middleware.push(thunkMiddleware) // lets us dispatch() functions
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  middleware.push(routerMiddleware(history))
  // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
  middleware.push(analyticsMiddleware) // middleware to help us track previous and future states

  if (sd.NODE_ENV === "development" || sd.NODE_ENV === "staging") {
    middleware.push(
      // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
      createLogger({
        // middleware that logs actions
        collapsed: true,
      })
    )
  }

  const store = createStore(reducers, applyMiddleware(...middleware))

  const determineSteps = () => {
    if (sd.CURRENT_USER) {
      store.dispatch(updateStepsWithUser())
    } else {
      store.dispatch(updateStepsWithoutUser())
    }
  }

  // track pageviews when react-router updates the url
  history.listen(ev => {
    // @ts-expect-error PLEASE_FIX_ME_STRICT_NULL_CHECK_MIGRATION
    window.analytics.page(
      { path: ev.pathname },
      { integrations: { Marketo: false } }
    )
  })

  render(
    <SystemContextProvider user={sd.CURRENT_USER}>
      <Provider store={store}>
        <ResponsiveWindow>
          <Router history={history}>
            <Switch>
              <Route
                exact
                path="/consign/submission"
                render={() => {
                  const params = queryString.parse(window.location.search)

                  /**
                   * If a logged out user arrives to consign, they first select
                   * an artist and then are prompted to create an account.
                   *
                   * We push the artist id / name into query params so when the
                   * page reloads (post user create) we can pre-populate the
                   * artist step with previously selected artist info, and
                   * skip directly to the "describe work" step.
                   */
                  if (params.artistId && params.artistName) {
                    store.dispatch(
                      chooseArtist({
                        _id: params.artistId,
                        name: params.artistName,
                      })
                    )

                    store.dispatch(updateStepsAfterCreateUser())
                    return <Redirect to={stepsConfig.describeWork.path} />
                  } else {
                    store.dispatch(updateStepsWithUser())
                    return <Redirect to={stepsConfig.chooseArtist.path} />
                  }
                }}
              />
              <Route
                path={stepsConfig.chooseArtist.path}
                render={() => {
                  determineSteps()
                  store.dispatch(updateCurrentStep("chooseArtist"))
                  return <SubmissionFlow />
                }}
              />
              <Route
                path={stepsConfig.createAccount.path}
                render={() => {
                  store.dispatch(updateStepsWithoutUser())
                  store.dispatch(updateCurrentStep("createAccount"))
                  return <SubmissionFlow />
                }}
              />
              <Route
                path={stepsConfig.describeWork.path}
                render={() => {
                  determineSteps()
                  store.dispatch(updateCurrentStep("describeWork"))
                  return <SubmissionFlow />
                }}
              />
              <Route
                path={stepsConfig.uploadPhotos.submissionPath}
                render={() => {
                  determineSteps()
                  store.dispatch(updateCurrentStep("uploadPhotos"))
                  return <SubmissionFlow />
                }}
              />
              <Route
                path={stepsConfig.describeWork.submissionPath}
                render={() => {
                  determineSteps()
                  store.dispatch(updateCurrentStep("describeWork"))
                  store.dispatch(updateLocationFromSubmissionAndFreeze())
                  return <SubmissionFlow />
                }}
              />
              <Route
                path={stepsConfig.uploadLanding.submissionPath}
                render={() => {
                  const Component = stepsConfig.uploadLanding.component
                  store.dispatch(updateAuthFormStateAndClearError("login"))
                  store.dispatch(ignoreRedirectOnAuth())
                  return <Component />
                }}
              />
              <Route
                path={stepsConfig.thankYou.submissionPath}
                component={stepsConfig.thankYou.component}
              />
            </Switch>
          </Router>
        </ResponsiveWindow>
      </Provider>
    </SystemContextProvider>,
    document.getElementById("consignments-submission__flow")
  )
}

export const init = () => {
  setupSubmissionFlow()
}
