import ResponsiveWindow from '../../../components/react/responsive_window'
import React from 'react'
import SubmissionFlow from '../components/submission_flow'
import geo from '../../../components/geo/index.coffee'
import reducers from './reducers'
import createHistory from 'history/createBrowserHistory'
import createLogger from 'redux-logger'
import stepsConfig from './steps_config'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import { Redirect, Router, Route, Switch } from 'react-router'
import { createStore, applyMiddleware } from 'redux'
import { data as sd } from 'sharify'
import {
  updateAuthFormStateAndClearError,
  updateCurrentStep,
  updateLocationFromSubmissionAndFreeze,
  updateStepsWithUser,
  updateStepsWithoutUser
} from './actions'
import { render } from 'react-dom'
import { routerMiddleware } from 'react-router-redux'

function setupSubmissionFlow () {
  // load google maps for autocomplete
  geo.loadGoogleMaps()

  const loggerMiddleware = createLogger()
  const history = createHistory()
  const store = createStore(
    reducers,
    applyMiddleware(
      thunkMiddleware, // lets us dispatch() functions
      routerMiddleware(history),
      loggerMiddleware // middleware that logs actions
    )
  )

  const determineSteps = () => {
    if (sd.CURRENT_USER) {
      store.dispatch(updateStepsWithUser())
    } else {
      store.dispatch(updateStepsWithoutUser())
    }
  }

  render(
    <Provider store={store}>
      <ResponsiveWindow>
        <Router history={history}>
          <Switch>
            <Route
              exact path='/consign2/submission'
              render={() => {
                if (sd.CURRENT_USER) {
                  store.dispatch(updateStepsWithUser())
                  return <Redirect to={stepsConfig.chooseArtist.path} />
                } else {
                  store.dispatch(updateStepsWithoutUser())
                  return <Redirect to={stepsConfig.createAccount.path} />
                }
              }}
            />
            <Route
              path={stepsConfig.createAccount.path}
              render={() => {
                store.dispatch(updateStepsWithoutUser())
                store.dispatch(updateCurrentStep('createAccount'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path={stepsConfig.chooseArtist.path}
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('chooseArtist'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path={stepsConfig.describeWork.path}
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('describeWork'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path={stepsConfig.uploadPhotos.submissionPath}
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('uploadPhotos'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path={stepsConfig.describeWork.submissionPath}
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('describeWork'))
                store.dispatch(updateLocationFromSubmissionAndFreeze())
                return <SubmissionFlow />
              }}
            />
            <Route
              path={stepsConfig.uploadLanding.submissionPath}
              render={() => {
                const Component = stepsConfig.uploadLanding.component
                store.dispatch(updateAuthFormStateAndClearError('logIn'))
                return <Component />
              }}
            />
            <Route path={stepsConfig.thankYou.submissionPath} component={stepsConfig.thankYou.component} />
          </Switch>
        </Router>
      </ResponsiveWindow>
    </Provider>,
    document.getElementById('consignments2-submission__flow')
  )
}

export default () => {
  setupSubmissionFlow()
}
