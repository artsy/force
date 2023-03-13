import { CollectorProfileSavesAndFollowsRoute_me$data } from "__generated__/CollectorProfileSavesAndFollowsRoute_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { CollectorProfileSavesRouteQueryRenderer } from "Apps/CollectorProfile/Routes/Saves/CollectorProfileSavesRoute"

interface CollectorProfileSavesAndFollowsRouteProps {
  me: CollectorProfileSavesAndFollowsRoute_me$data
}

const CollectorProfileSavesAndFollowsRoute: React.FC<CollectorProfileSavesAndFollowsRouteProps> = ({
  me,
}) => {
  return <CollectorProfileSavesRouteQueryRenderer />
}

export const CollectorProfileSavesAndFollowsRouteFragmentContainer = createFragmentContainer(
  CollectorProfileSavesAndFollowsRoute,
  {
    me: graphql`
      fragment CollectorProfileSavesAndFollowsRoute_me on Me {
        name
      }
    `,
  }
)
