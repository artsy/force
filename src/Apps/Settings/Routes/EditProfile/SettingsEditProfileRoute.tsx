import React from "react"
import { SettingsEditProfileRoute_me$data } from "__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"
import { SettingsEditProfileAboutYouFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileAboutYou"
import { SettingsEditProfileArtistsYouCollectFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileArtistsYouCollect/SettingsEditProfileArtistsYouCollect"
import { SettingsEditProfileFieldsFragmentContainer } from "Apps/Settings/Routes/EditProfile/Components/SettingsEditProfileFields"
import { useFeatureFlag } from "System/useFeatureFlag"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me$data
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          {isCollectorProfileEnabled ? (
            <>
              <SettingsEditProfileFieldsFragmentContainer me={me} />
            </>
          ) : (
            <>
              <SettingsEditProfileAboutYouFragmentContainer me={me} />

              <SettingsEditProfileArtistsYouCollectFragmentContainer me={me} />
            </>
          )}
        </Join>
      </Column>
    </GridColumns>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        ...SettingsEditProfileAboutYou_me
        ...SettingsEditProfileArtistsYouCollect_me
        ...SettingsEditProfileFields_me
      }
    `,
  }
)
