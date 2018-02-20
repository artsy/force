import React from 'react'
import { Route, Redirect } from 'react-router'

import { ProgressIndicator } from '@artsy/reaction-force/dist/Components/Onboarding/ProgressIndicator'
import CollectorIntent from '@artsy/reaction-force/dist/Components/Onboarding/Steps/CollectorIntent'
import Artists from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Artists'
import Genes from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Genes'
import Budget from '@artsy/reaction-force/dist/Components/Onboarding/Steps/Budget'

const STEPS = [
  `/personalize/${CollectorIntent.slug}`,
  `/personalize/${Artists.slug}`,
  `/personalize/${Genes.slug}`,
  `/personalize/${Budget.slug}`,
]

export class RoutesWithProgressBar extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
    }
  }

  onNextButtonPressed = (increaseBy, history) => {
    history.push(STEPS[STEPS.indexOf(location.pathname) + increaseBy])
  }

  onFinish = (redirectTo) => {
    this.setState({ finished: true })
    setTimeout(() => (window.location.href = redirectTo || '/'), 500)
  }

  render() {
    return (
      <div>
        <Route
          path="/personalize/*"
          render={() => (
            <ProgressIndicator
              percentComplete={
                this.state.finished
                  ? 1
                  : STEPS.indexOf(location.pathname) / STEPS.length
              }
            />
          )}
        />

        <Route
          path={`/personalize/${CollectorIntent.slug}`}
          render={(props) => (
            <CollectorIntent
              {...props}
              onNextButtonPressed={(increaseBy = 1) =>
                this.onNextButtonPressed(increaseBy, props.history)
              }
            />
          )}
        />
        <Route
          path={`/personalize/${Artists.slug}`}
          render={(props) => (
            <Artists
              {...props}
              onNextButtonPressed={(increaseBy = 1) =>
                this.onNextButtonPressed(increaseBy, props.history)
              }
            />
          )}
        />
        <Route
          path={`/personalize/${Genes.slug}`}
          render={(props) => (
            <Genes
              {...props}
              onNextButtonPressed={(increaseBy = 1) =>
                this.onNextButtonPressed(increaseBy, props.history)
              }
            />
          )}
        />
        <Route
          path={`/personalize/${Budget.slug}`}
          render={(props) => (
            <Budget
              {...props}
              onNextButtonPressed={(increaseBy = 1) =>
                this.onFinish(props.redirectTo, props.history)
              }
            />
          )}
        />

        {new RegExp('/personalize(/*)$').exec(location.pathname) && (
          <Redirect to={`/personalize/${CollectorIntent.slug}`} />
        )}
      </div>
    )
  }
}
