import React from "react"
import { SettingsSavesRoute_me } from "v2/__generated__/SettingsSavesRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsSavesArtworksQueryRenderer } from "./Components/SettingsSavesArtworks"
import { SettingsSavesArtistsQueryRenderer } from "./Components/SettingsSavesArtists"
import { Join, Separator } from "@artsy/palette"

interface SettingsSavesRouteProps {
  me: SettingsSavesRoute_me
}

const SettingsSavesRoute: React.FC<SettingsSavesRouteProps> = ({ me }) => {
  return (
    <Join separator={<Separator my={4} />}>
      <SettingsSavesArtworksQueryRenderer />

      <SettingsSavesArtistsQueryRenderer />
    </Join>
  )
}

export const SettingsSavesRouteFragmentContainer = createFragmentContainer(
  SettingsSavesRoute,
  {
    me: graphql`
      fragment SettingsSavesRoute_me on Me {
        name
      }
    `,
  }
)
