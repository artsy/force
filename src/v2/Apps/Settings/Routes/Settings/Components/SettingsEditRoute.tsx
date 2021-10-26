import { Text } from "@artsy/palette"
import React from "react"
import { SettingsEditRoute_me } from "v2/__generated__/SettingsEditRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsEditRouteProps {
  me: SettingsEditRoute_me
}

const SettingsEditRoute: React.FC<SettingsEditRouteProps> = ({ me }) => {
  return (
    <>
      <Text>Settings Route</Text>
    </>
  )
}

export const SettingsEditRouteFragmentContainer = createFragmentContainer(
  SettingsEditRoute,
  {
    me: graphql`
      fragment SettingsEditRoute_me on Me {
        name
      }
    `,
  }
)
