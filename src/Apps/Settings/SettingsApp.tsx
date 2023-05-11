import { Spacer, useToasts } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useRouter } from "System/Router/useRouter"
import { SettingsApp_me$data } from "__generated__/SettingsApp_me.graphql"
import { TopContextBar } from "Components/TopContextBar"
import { ProgressiveOnboardingAlertHighlight } from "Components/ProgressiveOnboarding/ProgressiveOnboardingAlertHighlight"

export const SETTINGS_ROUTE_TABS_MARGIN = [2, 4]

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const { sendToast } = useToasts()

  const {
    match: { location },
  } = useRouter()

  // Errors might come back from 3rd party authentication
  // as a string in an `error` query param, so display them if present.
  useEffect(() => {
    if (!location.query.error) return

    sendToast({
      message: location.query.error,
      variant: "error",
      ttl: Infinity,
    })
  }, [location.query.error, sendToast])

  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <TopContextBar displayBackArrow href="/collector-profile/my-collection">
        Collector Profile
      </TopContextBar>

      <Spacer y={[4, 6]} />

      <RouteTabs fill my={SETTINGS_ROUTE_TABS_MARGIN}>
        <RouteTab to="/settings/edit-profile">Edit Profile</RouteTab>

        <ProgressiveOnboardingAlertHighlight position="center">
          <RouteTab to="/settings/alerts">Saved Alerts</RouteTab>
        </ProgressiveOnboardingAlertHighlight>

        <RouteTab to="/settings/edit-settings">Account Settings</RouteTab>

        <RouteTab to="/settings/purchases">Order History</RouteTab>

        <RouteTab to="/settings/auctions">Bids</RouteTab>

        <RouteTab to="/settings/payments">Payments</RouteTab>

        <RouteTab to="/settings/shipping">Shipping</RouteTab>
      </RouteTabs>

      {children}
    </>
  )
}

export const SettingsAppFragmentContainer = createFragmentContainer(
  SettingsApp,
  {
    me: graphql`
      fragment SettingsApp_me on Me {
        name
      }
    `,
  }
)
