import React from "react"
import { Route } from "react-router"

import track, { TrackingProp } from "react-tracking"
import Events from "../../Utils/Events"
import { ProgressIndicator } from "../ProgressIndicator"

import Artists from "./Steps/Artists"
import Budget, { BudgetComponent } from "./Steps/Budget"
import CollectorIntent, {
  CollectorIntentComponent,
} from "./Steps/CollectorIntent"
import Genes from "./Steps/Genes"

const STEPS = [
  `/personalize/${CollectorIntentComponent.slug}`,
  `/personalize/${Artists.slug}`,
  `/personalize/${Genes.slug}`,
  `/personalize/${BudgetComponent.slug}`,
]

export interface Props {
  redirectTo?: string
  tracking?: TrackingProp
}

export interface State {
  finished: boolean
}

@track({}, { dispatch: data => Events.postEvent(data) })
export class Wizard extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.state = {
      finished: false,
    }
  }

  onNextButtonPressed = (increaseBy: number, history) => {
    history.push(STEPS[STEPS.indexOf(location.pathname) + increaseBy])
  }

  onFinish = () => {
    this.setState({ finished: true })
    const redirectTo = this.props.redirectTo || "/"
    setTimeout(() => window.location.assign(redirectTo), 500)

    this.props.tracking.trackEvent({
      action: "Completed Onboarding",
    })
  }

  render() {
    const percentComplete = this.state.finished
      ? 1
      : STEPS.indexOf(location.pathname) / STEPS.length

    return (
      <div>
        <ProgressIndicator percentComplete={percentComplete} />

        <Route
          path={`/personalize/${CollectorIntentComponent.slug}`}
          render={props => (
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
          render={props => (
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
          render={props => (
            <Genes
              {...props}
              onNextButtonPressed={(increaseBy = 1) =>
                this.onNextButtonPressed(increaseBy, props.history)
              }
            />
          )}
        />
        <Route
          path={`/personalize/${BudgetComponent.slug}`}
          render={props => (
            <Budget {...props} onNextButtonPressed={() => this.onFinish()} />
          )}
        />
      </div>
    )
  }
}
