import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsMyCollectionRoute_me } from "v2/__generated__/SettingsMyCollectionRoute_me.graphql"
import { SettingsMyCollectionArtworksQueryRenderer } from "./Components/SettingsMyCollectionArtworks"

interface SettingsMyCollectionRouteProps {
  me: SettingsMyCollectionRoute_me
}

const SettingsMyCollectionRoute: React.FC<SettingsMyCollectionRouteProps> = ({
  me,
}) => {
  return <SettingsMyCollectionArtworksQueryRenderer />
}

export const SettingsMyCollectionRouteFragmentContainer = createFragmentContainer(
  SettingsMyCollectionRoute,
  {
    me: graphql`
      fragment SettingsMyCollectionRoute_me on Me {
        name
      }
    `,
  }
)
