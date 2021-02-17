import React from "react"
import { Route } from "react-router"
import { TrackingProp } from "react-tracking"
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

export class Wizard extends React.Component<Props> {
  onNextButtonPressed = (increaseBy: number, history) => {
    history.push(STEPS[STEPS.indexOf(location.pathname) + increaseBy])
  }

  render() {
    const percentComplete = STEPS.indexOf(location.pathname) / STEPS.length

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
          render={routeProps => <Budget {...routeProps} {...this.props} />}
        />
      </div>
    )
  }
}
