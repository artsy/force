import { Join, Separator } from "@artsy/palette"
import { CollectorProfileFollowsRoute_me$data } from "__generated__/CollectorProfileFollowsRoute_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { SettingsSavesArtistsQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesProfiles"
interface CollectorProfileFollowsRouteProps {
  me: CollectorProfileFollowsRoute_me$data
}

const CollectorProfileFollowsRoute: React.FC<CollectorProfileFollowsRouteProps> = ({
  me,
}) => {
  return (
    <Join separator={<Separator my={4} />}>
      <SettingsSavesArtistsQueryRenderer />

      <SettingsSavesProfilesQueryRenderer />

      <SettingsSavesCategoriesQueryRenderer />
    </Join>
  )
}
export const CollectorProfileFollowsRouteFragmentContainer = createFragmentContainer(
  CollectorProfileFollowsRoute,
  {
    me: graphql`
      fragment CollectorProfileFollowsRoute_me on Me {
        name
      }
    `,
  }
)
