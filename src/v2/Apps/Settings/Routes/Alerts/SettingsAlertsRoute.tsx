import React from "react"
import { SettingsAlertsRoute_me } from "v2/__generated__/SettingsAlertsRoute_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { AllAlertsPaginationContainer } from "v2/Apps/Alerts/components/AllAlertsSection"

interface SettingsAlertsRouteProps {
  me: SettingsAlertsRoute_me
}

const SettingsAlertsRoute: React.FC<SettingsAlertsRouteProps> = ({ me }) => {
  return (
    <>
      <AllAlertsPaginationContainer me={me} />
    </>
  )
}

export const SettingsAlertsRouteFragmentContainer = createFragmentContainer(
  SettingsAlertsRoute,
  {
    me: graphql`
      fragment SettingsAlertsRoute_me on Me {
        ...AllAlertsSection_me
      }
    `,
  }
)
