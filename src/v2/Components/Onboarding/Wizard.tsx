import React from "react"
import { Route } from "react-router"
import { TrackingProp } from "react-tracking"
import Artists from "./Steps/Artists"
import Budget, { BudgetComponent } from "./Steps/Budget"
import CollectorIntent, {
  CollectorIntentComponent,
} from "./Steps/CollectorIntent"
import Genes from "./Steps/Genes"

export interface Props {
  redirectTo?: string
  tracking?: TrackingProp
}

export class Wizard extends React.Component<Props> {
  render() {
    return (
      <div>
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
