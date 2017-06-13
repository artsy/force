import ResponsiveWindow from '../../../components/react/responsive_window'
import React from 'react'
import SubmissionFlow from '../components/submission_flow'
import ThankYou from '../components/thank_you'
import UploadPhotoLanding from '../components/upload_photo_landing'
import geo from '../../../components/geo/index.coffee'
import reducers from './reducers'
import createHistory from 'history/createBrowserHistory'
import createLogger from 'redux-logger'
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
                  return <Redirect to='/consign2/submission/choose-artist' />
                } else {
                  store.dispatch(updateStepsWithoutUser())
                  return <Redirect to='/consign2/submission/create-account' />
                }
              }}
            />
            <Route
              path='/consign2/submission/create-account'
              render={() => {
                store.dispatch(updateStepsWithoutUser())
                store.dispatch(updateCurrentStep('createAccount'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path='/consign2/submission/choose-artist'
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('chooseArtist'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path='/consign2/submission/describe-your-work'
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('describeWork'))
                return <SubmissionFlow />
              }}
            />
            <Route
              path='/consign2/submission/:id/upload-photos'
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('uploadPhotos'))
                return <SubmissionFlow />
              }}
            />
            <Route path='/consign2/submission/:submission_id/thank-you' component={ThankYou} />
            <Route
              path='/consign2/submission/:submission_id/describe-your-work'
              render={() => {
                determineSteps()
                store.dispatch(updateCurrentStep('describeWork'))
                store.dispatch(updateLocationFromSubmissionAndFreeze())
                return <SubmissionFlow />
              }}
            />
            <Route
              path='/consign2/submission/:submission_id/upload'
              render={() => {
                store.dispatch(updateAuthFormStateAndClearError('logIn'))
                return <UploadPhotoLanding />
              }}
            />
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
