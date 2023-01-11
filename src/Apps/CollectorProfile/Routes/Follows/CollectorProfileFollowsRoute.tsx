import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Join, Separator } from "@artsy/palette"
import { CollectorProfileFollowsRoute_me$data } from "__generated__/CollectorProfileFollowsRoute_me.graphql"

import { SettingsSavesArtistsQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesArtists"
import { SettingsSavesCategoriesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesCategories"
import { SettingsSavesProfilesQueryRenderer } from "Apps/Settings/Routes/Saves/Components/SettingsSavesProfiles"
import { useFeatureFlag } from "System/useFeatureFlag"
import { useRouter } from "System/Router/useRouter"
interface CollectorProfileFollowsRouteProps {
  me: CollectorProfileFollowsRoute_me$data
}

const CollectorProfileFollowsRoute: React.FC<CollectorProfileFollowsRouteProps> = ({
  me,
}) => {
  const { router } = useRouter()
  const isSeparateSavesAndFollowsEnabled = useFeatureFlag(
    "collector-profile-separating-saves-and-follows"
  )

  useEffect(() => {
    if (!isSeparateSavesAndFollowsEnabled) {
      router.replace("/collector-profile/saves")
    }
  }, [isSeparateSavesAndFollowsEnabled, router])

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
