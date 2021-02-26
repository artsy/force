import { Box, Theme, Text } from "@artsy/palette"
import { SavedAddressesFragmentContainer as SavedAddresses } from "v2/Apps/Order/Components/SavedAddresses"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemContextProps } from "v2/Artsy"
import React from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { UserSettingsAddressesQuery } from "v2/__generated__/UserSettingsAddressesQuery.graphql"
import { UserSettingsAddresses_me } from "v2/__generated__/UserSettingsAddresses_me.graphql"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { useSystemContext } from "v2/Artsy"

interface UserSettingsAddressesProps extends SystemContextProps {
  me: UserSettingsAddresses_me
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const UserSettingsAddresses: React.FC<UserSettingsAddressesProps> = props => {
  const handleClickEdit = () => {}
  const { me } = props

  return (
    <Theme>
      <Box maxWidth={940} mb={3}>
        <Text variant="subtitle" mb={3}>
          Saved Addresses
        </Text>
        <SavedAddresses
          me={me}
          handleClickEdit={handleClickEdit}
          inCollectorProfile
          {...props}
        />
      </Box>
    </Theme>
  )
}

export const UserSettingsAddressesFragmentContainer = createFragmentContainer(
  injectCommitMutation(UserSettingsAddresses),
  {
    me: graphql`
      fragment UserSettingsAddresses_me on Me {
        ...SavedAddresses_me
        id
        internalID
      }
    `,
  }
)

export const UserSettingsAddressesQueryRenderer = () => {
  const { relayEnvironment, user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <QueryRenderer<UserSettingsAddressesQuery>
      environment={relayEnvironment}
      variables={{}}
      query={graphql`
        query UserSettingsAddressesQuery {
          me {
            ...UserSettingsAddresses_me
          }
        }
      `}
      render={renderWithLoadProgress(UserSettingsAddressesFragmentContainer)}
    />
  )
}
