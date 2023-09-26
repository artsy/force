import { Join, Separator } from "@artsy/palette"
import { CollectorProfileFollowsRoute_me$data } from "__generated__/CollectorProfileFollowsRoute_me.graphql"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"

import { SettingsSavesArtistsQueryRenderer } from "Apps/CollectorProfile/Routes/Follows/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/CollectorProfile/Routes/Follows/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/CollectorProfile/Routes/Follows/SettingsSavesProfiles"
import { MetaTags } from "Components/MetaTags"
interface CollectorProfileFollowsRouteProps {
  me: CollectorProfileFollowsRoute_me$data
}

const CollectorProfileFollowsRoute: React.FC<CollectorProfileFollowsRouteProps> = ({
  me,
}) => {
  return (
    <>
      <MetaTags title="Follows | Artsy" pathname="collector-profile/follows" />

      <Join separator={<Separator my={4} />}>
        <SettingsSavesArtistsQueryRenderer />

        <SettingsSavesProfilesQueryRenderer />

        <SettingsSavesCategoriesQueryRenderer />
      </Join>
    </>
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
