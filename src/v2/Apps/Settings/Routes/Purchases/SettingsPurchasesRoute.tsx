import { Text } from "@artsy/palette"
import React from "react"
import { SettingsPurchasesRoute_me } from "v2/__generated__/SettingsPurchasesRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsPurchasesRouteProps {
  me: SettingsPurchasesRoute_me
}

const SettingsPurchasesRoute: React.FC<SettingsPurchasesRouteProps> = ({
  me,
}) => {
  return (
    <>
      <Text>Purchases Route</Text>
    </>
  )
}

export const SettingsPurchasesRouteFragmentContainer = createFragmentContainer(
  SettingsPurchasesRoute,
  {
    me: graphql`
      fragment SettingsPurchasesRoute_me on Me {
        name
      }
    `,
  }
)
