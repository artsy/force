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
  render() {
    const percentComplete = STEPS.indexOf(location.pathname) / STEPS.length

    return (
      <div>
        <ProgressIndicator percentComplete={percentComplete} />

        <Route
          path={`/personalize/${CollectorIntentComponent.slug}`}
          render={routeProps => (
            <CollectorIntent {...routeProps} {...this.props} />
          )}
        />
        <Route
          path={`/personalize/${Artists.slug}`}
          render={routeProps => <Artists {...routeProps} {...this.props} />}
        />
        <Route
          path={`/personalize/${Genes.slug}`}
          render={routeProps => <Genes {...routeProps} {...this.props} />}
        />
        <Route
          path={`/personalize/${BudgetComponent.slug}`}
          render={routeProps => <Budget {...routeProps} {...this.props} />}
        />
      </div>
    )
  }
}
