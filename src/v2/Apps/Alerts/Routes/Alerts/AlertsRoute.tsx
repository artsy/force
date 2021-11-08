import * as React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { Title } from "react-head"
import { AlertsRoute_me } from "v2/__generated__/AlertsRoute_me.graphql"
import { Box, Text } from "@artsy/palette"
import { AllAlertsPaginationContainer } from "../../components/AllAlertsSection"

export interface AlertsRouteProps {
  me: AlertsRoute_me
}

const AlertsRoute: React.FC<AlertsRouteProps> = props => {
  const { me } = props

  return (
    <>
      <Title>Saved alerts | Artsy</Title>
      <Text variant="lg" my={4}>
        Saved alerts
      </Text>
      <Box pb={[2, 4]}>
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
