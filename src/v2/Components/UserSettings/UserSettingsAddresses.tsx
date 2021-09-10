import { Box, Text } from "@artsy/palette"
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
  const [updater, setAddressCountChanged] = useState()
  const handeChangesAddressCount = totalcount => {
    setAddressCountChanged(totalcount)
  }

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
    <Box mb={2}>
      <Text variant={["sm", "lg"]} my={[2, 4]}>
        {updater ? "Saved Addresses" : "No Saved Addresses"}
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
        handeChangesAddressCount={handeChangesAddressCount}
        onShowToast={onShowToast}
        inCollectorProfile
        {...props}
      />
    </Box>
  )
}

export const UserSettingsAddressesFragmentContainer = createFragmentContainer(
  injectCommitMutation(UserSettingsAddresses),
  {
    me: graphql`
      fragment UserSettingsAddresses_me on Me {
        id
        internalID
        ...SavedAddresses_me
        addresses: addressConnection {
          totalCount
        }
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
      environment={relayEnvironment!}
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
