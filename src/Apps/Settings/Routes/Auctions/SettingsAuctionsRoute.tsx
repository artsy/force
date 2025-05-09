import { Join, Separator } from "@artsy/palette"
import type { SettingsAuctionsRoute_me$data } from "__generated__/SettingsAuctionsRoute_me.graphql"
import type React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { UserActiveBidsFragmentContainer } from "./Components/UserActiveBids"
import { UserBidHistoryFragmentContainer } from "./Components/UserBidHistory"
import { UserRegistrationAuctionsFragmentContainer } from "./Components/UserRegistrationAuctions"

interface SettingsAuctionsRouteProps {
  me: SettingsAuctionsRoute_me$data
}

const SettingsAuctionsRoute: React.FC<
  React.PropsWithChildren<SettingsAuctionsRouteProps>
> = ({ me }) => {
  return (
    <Join separator={<Separator my={4} />}>
      <UserActiveBidsFragmentContainer me={me} />

      <UserBidHistoryFragmentContainer me={me} />

      <UserRegistrationAuctionsFragmentContainer me={me} />
    </Join>
  )
}

export const SettingsAuctionsRouteFragmentContainer = createFragmentContainer(
  SettingsAuctionsRoute,
  {
    me: graphql`
      fragment SettingsAuctionsRoute_me on Me {
        ...UserActiveBids_me
        ...UserBidHistory_me
        ...UserRegistrationAuctions_me
      }
    `,
  },
)
