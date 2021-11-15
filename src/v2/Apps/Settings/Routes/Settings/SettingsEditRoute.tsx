import React from "react"
import { SettingsEditRoute_me } from "v2/__generated__/SettingsEditRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsEditProfileRouteFragmentContainer } from "../EditProfile/SettingsEditProfileRoute"

interface SettingsEditRouteProps {
  me: SettingsEditRoute_me
}

const SettingsEditRoute: React.FC<SettingsEditRouteProps> = ({ me }) => {
  return <SettingsEditProfileRouteFragmentContainer me={me} />
}

export const SettingsEditRouteFragmentContainer = createFragmentContainer(
  SettingsEditRoute,
  {
    me: graphql`
      fragment SettingsEditRoute_me on Me {
        ...SettingsEditProfileRoute_me
      }
    `,
  }
)
