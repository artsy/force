import { Box, Theme, Text } from "@artsy/palette"
import { SavedAddressesFragmentContainer as SavedAddresses } from "v2/Apps/Order/Components/SavedAddresses"
import { renderWithLoadProgress } from "v2/System/Relay/renderWithLoadProgress"
import { SystemContextProps } from "v2/System"
import React, { useState } from "react"
import { createFragmentContainer, graphql, QueryRenderer } from "react-relay"
import { UserSettingsAddressesQuery } from "v2/__generated__/UserSettingsAddressesQuery.graphql"
import { UserSettingsAddresses_me } from "v2/__generated__/UserSettingsAddresses_me.graphql"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import { useSystemContext } from "v2/System"
import ToastComponent from "../Toast/ToastComponent"

interface UserSettingsAddressesProps extends SystemContextProps {
  me: UserSettingsAddresses_me
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const UserSettingsAddresses: React.FC<UserSettingsAddressesProps> = props => {
  const { me } = props

  const [notificationState, setNotificationState] = useState({
    notificationVisible: false,
    action: "",
  })

  const onShowToast = (isShow, action) => {
    setNotificationState({
      notificationVisible: isShow,
      action: action,
    })
  }
  const onCloseToast = () => {
    setNotificationState({
      ...notificationState,
      notificationVisible: false,
    })
  }

  return (
    <Theme>
      <Box maxWidth={940} mb={3}>
        <Text variant="subtitle" mb={3}>
          Saved Addresses
        </Text>
        <ToastComponent
          showNotification={notificationState.notificationVisible}
          notificationAction={notificationState.action}
          duration={5000}
          title="Address Successfully"
          onCloseToast={onCloseToast}
        />
        <SavedAddresses
          // @ts-expect-error STRICT_NULL_CHECK
          me={me}
          onShowToast={onShowToast}
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
      // @ts-expect-error STRICT_NULL_CHECK
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
