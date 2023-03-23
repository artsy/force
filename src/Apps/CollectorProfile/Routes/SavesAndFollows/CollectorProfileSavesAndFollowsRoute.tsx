import { CollectorProfileSavesAndFollowsRoute_me$data } from "__generated__/CollectorProfileSavesAndFollowsRoute_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { CollectorProfileSavesRouteQueryRenderer } from "Apps/CollectorProfile/Routes/Saves/CollectorProfileSavesRoute"
import { useFeatureFlag } from "System/useFeatureFlag"
import { CollectorProfileSaves2RouteFragmentContainer } from "Apps/CollectorProfile/Routes/Saves2/CollectorProfileSaves2Route"

interface CollectorProfileSavesAndFollowsRouteProps {
  me: CollectorProfileSavesAndFollowsRoute_me$data
}

const CollectorProfileSavesAndFollowsRoute: React.FC<CollectorProfileSavesAndFollowsRouteProps> = ({
  me,
}) => {
  const isArtworksListEnabled = useFeatureFlag("force-enable-artworks-list")

  if (isArtworksListEnabled) {
    return <CollectorProfileSaves2RouteFragmentContainer me={me} />
  }

  return <CollectorProfileSavesRouteQueryRenderer />
}

export const CollectorProfileSavesAndFollowsRouteFragmentContainer = createFragmentContainer(
  CollectorProfileSavesAndFollowsRoute,
  {
    me: graphql`
      fragment CollectorProfileSavesAndFollowsRoute_me on Me {
        name
        ...CollectorProfileSaves2Route_me
      }
    `,
  }
)
