import type { SettingsOrdersRoute_me$data } from "__generated__/SettingsOrdersRoute_me.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsOrdersFragmentContainer } from "./Components/SettingsOrders"

interface SettingsOrdersRouteProps {
  me: SettingsOrdersRoute_me$data
}

const SettingsOrdersRoute: React.FC<
  React.PropsWithChildren<SettingsOrdersRouteProps>
> = ({ me }) => {
  return <SettingsOrdersFragmentContainer me={me} />
}

export const SettingsOrdersRouteFragmentContainer = createFragmentContainer(
  SettingsOrdersRoute,
  {
    me: graphql`
      fragment SettingsOrdersRoute_me on Me
      @argumentDefinitions(page: { type: "Int", defaultValue: 1 }) {
        ...SettingsOrders_me @arguments(page: $page)
      }
    `,
  },
)
