import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsShippingAddressesFragmentContainer } from "./Components/SettingsShippingAddresses"
import { SettingsShippingRoute_me } from "v2/__generated__/SettingsShippingRoute_me.graphql"

interface SettingsShippingRouteProps {
  me: SettingsShippingRoute_me
}

const SettingsShippingRoute: React.FC<SettingsShippingRouteProps> = ({
  me,
}) => {
  return (
    <>
      <SettingsShippingAddressesFragmentContainer me={me} />
    </>
  )
}

export const SettingsShippingRouteFragmentContainer = createFragmentContainer(
  SettingsShippingRoute,
  {
    me: graphql`
      fragment SettingsShippingRoute_me on Me {
        ...SettingsShippingAddresses_me
      }
    `,
  }
)
