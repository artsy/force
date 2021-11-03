import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { AlertsRoute_me } from "v2/__generated__/AlertsRoute_me.graphql"
import { data as sd } from "sharify"
import { Box } from "@artsy/palette"
import { UserSettingsTabs } from "v2/Components/UserSettings/UserSettingsTabs"
import { AllAlertsPaginationContainer } from "../../components/AllAlertsSection"

export interface AlertsRouteProps {
  me: AlertsRoute_me
}

const AlertsRoute: React.FC<AlertsRouteProps> = props => {
  const { me } = props

  return (
    <>
      <Title>Saved alerts | Artsy</Title>
      <Box mx={[1, 4]} pb={[2, 4]}>
        <Box mb={2} mt={1}>
          <UserSettingsTabs route={sd.CURRENT_PATH} username={me?.name} />
        </Box>

        <AllAlertsPaginationContainer me={me} />
      </Box>
    </>
  )
}

export const AlertsRouteFragmentContainer = createFragmentContainer(
  AlertsRoute,
  {
    me: graphql`
      fragment AlertsRoute_me on Me {
        name
        ...AllAlertsSection_me
      }
    `,
  }
)
