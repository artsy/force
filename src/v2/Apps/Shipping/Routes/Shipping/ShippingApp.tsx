import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { ShippingApp_me } from "v2/__generated__/ShippingApp_me.graphql"
// eslint-disable-next-line no-restricted-imports
import { data as sd } from "sharify"
import { Box } from "@artsy/palette"
import { UserSettingsTabs } from "v2/Components/UserSettings/UserSettingsTabs"
import { UserSettingsAddressesFragmentContainer as UserSettingsAddresses } from "./UserSettingsAddresses"

export interface ShippingAppProps {
  me: ShippingApp_me
}

const ShippingApp: React.FC<ShippingAppProps> = props => {
  const { me } = props

  // FIXME: the margins for Boxes below are added to make it consistent with
  // the purchase app. We need to move these to a component when we move all tabs
  // to apps
  return (
    <>
      <Title>My addresses | Artsy</Title>
      <Box mx={[1, 4]} pb={[2, 4]}>
        <Box mb={2} mt={1}>
          <UserSettingsTabs route={sd.CURRENT_PATH} username={me?.name} />
        </Box>
        <UserSettingsAddresses me={me} />
      </Box>
    </>
  )
}

export const ShippingAppFragmentContainer = createFragmentContainer(
  ShippingApp,
  {
    me: graphql`
      fragment ShippingApp_me on Me {
        name
        ...UserSettingsAddresses_me
      }
    `,
  }
)
