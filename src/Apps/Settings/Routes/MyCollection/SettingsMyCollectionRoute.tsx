import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsMyCollectionRoute_me } from "__generated__/SettingsMyCollectionRoute_me.graphql"
import { MyCollectionArtworksQueryRenderer } from "./Components/SettingsMyCollectionArtworks"

interface SettingsMyCollectionRouteProps {
  me: SettingsMyCollectionRoute_me
}

const SettingsMyCollectionRoute: React.FC<SettingsMyCollectionRouteProps> = ({
  me,
}) => {
  return <MyCollectionArtworksQueryRenderer />
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
