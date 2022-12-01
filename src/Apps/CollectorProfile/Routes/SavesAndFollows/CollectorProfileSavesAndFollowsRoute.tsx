import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Separator } from "@artsy/palette"
import { CollectorProfileSavesAndFollowsRoute_me$data } from "__generated__/CollectorProfileSavesAndFollowsRoute_me.graphql"

import { SettingsSavesArtworksQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesArtworks"
import { SettingsSavesArtistsQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesProfiles"

interface CollectorProfileSavesAndFollowsRouteProps {
  me: CollectorProfileSavesAndFollowsRoute_me$data
}

const CollectorProfileSavesAndFollowsRoute: React.FC<CollectorProfileSavesAndFollowsRouteProps> = ({
  me,
}) => {
  return (
    <Join separator={<Separator my={4} />}>
      <SettingsSavesArtworksQueryRenderer />

      <SettingsSavesArtistsQueryRenderer />

      <SettingsSavesProfilesQueryRenderer />

      <SettingsSavesCategoriesQueryRenderer />
    </Join>
  )
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
