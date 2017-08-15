import React from 'react'
import ResponsiveWindow from 'desktop/components/react/responsive_window'
import SubmissionFlow from 'desktop/apps/consign/components/submission_flow'
import { Provider } from 'react-redux'
import { Redirect, Route, Switch } from 'react-router'
import { data as sd } from 'sharify'
import stepsConfig from '../../client/steps_config'
import {
  ignoreRedirectOnAuth,
  updateAuthFormStateAndClearError,
  updateCurrentStep,
  updateLocationFromSubmissionAndFreeze,
  updateStepsWithUser,
  updateStepsWithoutUser
} from '../../client/actions'

export default function App (props) {
  const store = props.store

  const determineSteps = () => {
    if (sd.CURRENT_USER) {
      store.dispatch(updateStepsWithUser())
    } else {
      store.dispatch(updateStepsWithoutUser())
    }
  }

  return (
    <Provider store={store}>
      <ResponsiveWindow>
          <Switch>
            <Route
              exact path='/consign/submission'
              render={() => {
                /* if (sd.CURRENT_USER) {
                  store.dispatch(updateStepsWithUser())
                  return <Redirect to={stepsConfig.chooseArtist.path} />
                } else {
                  store.dispatch(updateStepsWithoutUser())
                  return <Redirect to={stepsConfig.createAccount.path} />
                } */
                store.dispatch(updateStepsWithUser())
                return <SubmissionFlow />
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
                store.dispatch(ignoreRedirectOnAuth())
                return <Component />
              }}
            />
            <Route path={stepsConfig.thankYou.submissionPath} component={stepsConfig.thankYou.component} />
          </Switch>
      </ResponsiveWindow>
    </Provider>
  )
}
