import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsShippingAddressesFragmentContainer } from "./Components/SettingsShippingAddresses"
import type { SettingsShippingRoute_me$data } from "__generated__/SettingsShippingRoute_me.graphql"

interface SettingsShippingRouteProps {
  me: SettingsShippingRoute_me$data
}

const SettingsShippingRoute: React.FC<
  React.PropsWithChildren<SettingsShippingRouteProps>
> = ({ me }) => {
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
