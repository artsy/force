import { Text } from "@artsy/palette"
import React from "react"
import { SettingsSavesRoute_me } from "v2/__generated__/SettingsSavesRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsSavesRouteProps {
  me: SettingsSavesRoute_me
}

const SettingsSavesRoute: React.FC<SettingsSavesRouteProps> = ({ me }) => {
  return (
    <>
      <Text>Saves Route</Text>
    </>
  )
}

export const SettingsSavesRouteFragmentContainer = createFragmentContainer(
  SettingsSavesRoute,
  {
    me: graphql`
      fragment SettingsSavesRoute_me on Me {
        name
      }
    `,
  }
)
