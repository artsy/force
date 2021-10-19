import { Text } from "@artsy/palette"
import React from "react"
import { SettingsAuctionsRoute_me } from "v2/__generated__/SettingsAuctionsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsAuctionsRouteProps {
  me: SettingsAuctionsRoute_me
}

const SettingsAuctionsRoute: React.FC<SettingsAuctionsRouteProps> = ({
  me,
}) => {
  return (
    <>
      <Text>Auctions Route</Text>
    </>
  )
}

export const SettingsAuctionsRouteFragmentContainer = createFragmentContainer(
  SettingsAuctionsRoute,
  {
    me: graphql`
      fragment SettingsAuctionsRoute_me on Me {
        name
      }
    `,
  }
)
