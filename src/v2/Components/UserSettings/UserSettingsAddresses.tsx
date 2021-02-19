import { Box, Theme, Text } from "@artsy/palette"
import { SavedAddressesFragmentContainer as SavedAddresses } from "v2/Apps/Order/Components/SavedAddresses"
import { renderWithLoadProgress } from "v2/Artsy/Relay/renderWithLoadProgress"
import { SystemContextProps } from "v2/Artsy"
import React, { useContext } from "react"
import {
  RelayProp,
  createFragmentContainer,
  graphql,
  QueryRenderer,
} from "react-relay"
import { SystemContext } from "v2/Artsy"
import { UserSettingsAddressesQuery } from "v2/__generated__/UserSettingsAddressesQuery.graphql"
import { UserSettingsAddresses_me } from "v2/__generated__/UserSettingsAddresses_me.graphql"

interface UserSettingsAddressesProps extends SystemContextProps {
  // relay?: RelayProp
  me: UserSettingsAddresses_me
  addressCount: number
}

export const UserSettingsAddresses: React.FC<UserSettingsAddressesProps> = ({
  me,
  addressCount,
}) => {
  const handleClickEdit = () => {}

  return (
    <Theme>
      <>
        {addressCount > 0 ? (
          <>
            <Text variant="subtitle" mb={3}>
              Saved Addresses
            </Text>
            <Box maxWidth={940}>
              <SavedAddresses
                me={me}
                // onSelect={null}
                handleClickEdit={handleClickEdit}
                inCollectorProfile
              />
            </Box>
          </>
        ) : null}
      </>
    </Theme>
  )
}

export const UserSettingsAddressesFragmentContainer = createFragmentContainer(
  UserSettingsAddresses,
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
  const { user, relayEnvironment } = useContext(SystemContext)
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
