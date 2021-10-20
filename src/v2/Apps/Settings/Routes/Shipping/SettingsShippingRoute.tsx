import { Text } from "@artsy/palette"
import React from "react"
import { SettingsShippingRoute_me } from "v2/__generated__/SettingsShippingRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsShippingRouteProps {
  me: SettingsShippingRoute_me
}

const SettingsShippingRoute: React.FC<SettingsShippingRouteProps> = ({
  me,
}) => {
  return (
    <>
      <Text>Shipping Route</Text>
    </>
  )
}

export const SettingsShippingRouteFragmentContainer = createFragmentContainer(
  SettingsShippingRoute,
  {
    me: graphql`
      fragment SettingsShippingRoute_me on Me {
        name
      }
    `,
  }
)
