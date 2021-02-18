import React from "react"
import { Route } from "react-router"
import { TrackingProp } from "react-tracking"
import Artists from "./Steps/Artists"
import Budget from "./Steps/Budget"
import CollectorIntent from "./Steps/CollectorIntent"
import Genes from "./Steps/Genes"

export interface Props {
  redirectTo?: string
  tracking?: TrackingProp
}

export const Wizard: React.FC<Props> = props => {
  return (
    <div>
      <Route
        path="/personalize/interests"
        render={routeProps => <CollectorIntent {...routeProps} {...props} />}
      />
      <Route
        path="/personalize/artists"
        render={routeProps => <Artists {...routeProps} {...props} />}
      />
      <Route
        path="/personalize/categories"
        render={routeProps => <Genes {...routeProps} {...props} />}
      />
      <Route
        path="/personalize/budget"
        render={routeProps => <Budget {...routeProps} {...props} />}
      />
    </div>
  )
}
