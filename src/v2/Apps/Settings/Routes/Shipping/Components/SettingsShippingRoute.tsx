import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { UserSettingsAddresses } from "v2/Components/UserSettings/UserSettingsAddresses"
import { UserSettingsAddresses_me } from "v2/__generated__/UserSettingsAddresses_me.graphql"
import { CommitMutation } from "v2/Apps/Order/Utils/commitMutation"

interface SettingsShippingRouteProps {
  me: UserSettingsAddresses_me
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

const SettingsShippingRoute: React.FC<SettingsShippingRouteProps> = ({
  me,
  commitMutation,
  isCommittingMutation,
}) => {
  return (
    <>
      <UserSettingsAddresses
        me={me}
        commitMutation={commitMutation}
        isCommittingMutation={isCommittingMutation}
      />
    </>
  )
}

export const SettingsShippingRouteFragmentContainer = createFragmentContainer(
  SettingsShippingRoute,
  {
    me: graphql`
      fragment SettingsShippingRoute_me on Me {
        ...UserSettingsAddresses_me
      }
    `,
  }
)
