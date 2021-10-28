import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { PaymentApp_me } from "v2/__generated__/PaymentApp_me.graphql"
import { data as sd } from "sharify"
import { Box } from "@artsy/palette"
import { PaymentSectionFragmentContainer as PaymentSection } from "./../../Components/PaymentSection"
import { UserSettingsTabs } from "v2/Components/UserSettings/UserSettingsTabs"

export interface PaymentAppProps {
  me: PaymentApp_me
}

const PaymentApp: React.FC<PaymentAppProps> = props => {
  const { me } = props

  // FIXME: the margins for Boxes below are added to make it consistent with
  // the purchase app. We need to move these to a component when we move all tabs
  // to apps
  return (
    <>
      <Title>My payments | Artsy</Title>
      <Box mx={[1, 4]} pb={[2, 4]}>
        <Box mb={2} mt={1}>
          <UserSettingsTabs route={sd.CURRENT_PATH} username={me?.name} />
        </Box>
        <PaymentSection me={me} />
      </Box>
    </>
  )
}

export const PaymentAppFragmentContainer = createFragmentContainer(PaymentApp, {
  me: graphql`
    fragment PaymentApp_me on Me {
      name
      ...PaymentSection_me
    }
  `,
})
