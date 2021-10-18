import { Text } from "@artsy/palette"
import React from "react"
import { SettingsEditProfileRoute_me } from "v2/__generated__/SettingsEditProfileRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsEditProfileRouteProps {
  me: SettingsEditProfileRoute_me
}

const SettingsEditProfileRoute: React.FC<SettingsEditProfileRouteProps> = ({
  me,
}) => {
  return (
    <>
      <Text>Edit Profile Route</Text>
    </>
  )
}

export const SettingsEditProfileRouteFragmentContainer = createFragmentContainer(
  SettingsEditProfileRoute,
  {
    me: graphql`
      fragment SettingsEditProfileRoute_me on Me {
        name
      }
    `,
  }
)
