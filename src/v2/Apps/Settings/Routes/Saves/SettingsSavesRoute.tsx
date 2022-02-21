import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Separator } from "@artsy/palette"
import { SettingsSavesRoute_me$data } from "v2/__generated__/SettingsSavesRoute_me.graphql"
import { SettingsSavesArtworksQueryRenderer } from "./Components/SettingsSavesArtworks"
import { SettingsSavesArtistsQueryRenderer } from "./Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "./Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "./Components/SettingsSavesProfiles"

interface SettingsSavesRouteProps {
  me: SettingsSavesRoute_me$data
}

const SettingsSavesRoute: React.FC<SettingsSavesRouteProps> = ({ me }) => {
  return (
    <Join separator={<Separator my={4} />}>
      <SettingsSavesArtworksQueryRenderer />

      <SettingsSavesArtistsQueryRenderer />

      <SettingsSavesProfilesQueryRenderer />

      <SettingsSavesCategoriesQueryRenderer />
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
