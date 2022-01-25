import { Box, Text } from "@artsy/palette"
import { SavedAddressesFragmentContainer as SavedAddresses } from "v2/Apps/Order/Components/SavedAddresses"
import { SystemContextProps } from "v2/System"
import { useState } from "react"
import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { UserSettingsAddresses_me } from "v2/__generated__/UserSettingsAddresses_me.graphql"
import {
  CommitMutation,
  injectCommitMutation,
} from "v2/Apps/Order/Utils/commitMutation"
import ToastComponent from "v2/Components/Toast/ToastComponent"
interface UserSettingsAddressesProps extends SystemContextProps {
  me: UserSettingsAddresses_me
  commitMutation: CommitMutation
  isCommittingMutation: boolean
}

export const UserSettingsAddresses: React.FC<UserSettingsAddressesProps> = props => {
  const { me, ...rest } = props

  const [notificationState, setNotificationState] = useState({
    notificationVisible: false,
    action: "",
  })
  const [updater, setAddressCountChanged] = useState()
  const handleChangeAddressCount = totalcount => {
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
        me={me}
        onChangeAddressCount={handleChangeAddressCount}
        onShowToast={onShowToast}
        inCollectorProfile
        {...rest}
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
