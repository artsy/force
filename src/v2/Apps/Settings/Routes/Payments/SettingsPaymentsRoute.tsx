import { Text } from "@artsy/palette"
import React from "react"
import { SettingsPaymentsRoute_me } from "v2/__generated__/SettingsPaymentsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsPaymentsRouteProps {
  me: SettingsPaymentsRoute_me
}

const SettingsPaymentsRoute: React.FC<SettingsPaymentsRouteProps> = ({
  me,
}) => {
  return (
    <>
      <Text>Payments Route</Text>
    </>
  )
}

export const SettingsPaymentsRouteFragmentContainer = createFragmentContainer(
  SettingsPaymentsRoute,
  {
    me: graphql`
      fragment SettingsPaymentsRoute_me on Me {
        name
      }
    `,
  }
)
