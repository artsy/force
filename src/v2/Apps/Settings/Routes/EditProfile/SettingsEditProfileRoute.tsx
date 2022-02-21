import React from "react"
import { SettingsEditProfileRoute_me$data } from "v2/__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { Column, GridColumns, Join, Separator } from "@artsy/palette"
import { SettingsEditProfileAboutYouFragmentContainer } from "./Components/SettingsEditProfileAboutYou"
import { SettingsEditProfileArtistsYouCollectFragmentContainer } from "./Components/SettingsEditProfileArtistsYouCollect/SettingsEditProfileArtistsYouCollect"
import { SettingsEditProfileYourGalleryIntroFragmentContainer } from "./Components/SettingsEditProfileYourGalleryIntro"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me$data
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  return (
    <GridColumns>
      <Column span={8}>
        <Join separator={<Separator my={4} />}>
          <SettingsEditProfileAboutYouFragmentContainer me={me} />

          <SettingsEditProfileArtistsYouCollectFragmentContainer me={me} />

          <SettingsEditProfileYourGalleryIntroFragmentContainer me={me} />
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
        ...SettingsEditProfileYourGalleryIntro_me
      }
    `,
  }
)
