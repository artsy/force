import { Column, GridColumns } from "@artsy/palette"
import React from "react"
import { SettingsEditProfileRoute_me } from "v2/__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditProfileAboutYouFragmentContainer } from "./Components/SettingsEditProfileAboutYou"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  return (
    <>
      <GridColumns>
        <Column span={8}>
          <SettingsEditProfileAboutYouFragmentContainer me={me} />
        </Column>
      </GridColumns>
    </>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        name
        ...SettingsEditProfileAboutYou_me
      }
    `,
  }
)
