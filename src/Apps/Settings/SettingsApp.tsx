import { Text } from "@artsy/palette"
import { MyCollectionRouteLoggedOutState } from "Apps/Settings/Routes/MyCollection/MyCollectionRouteLoggedOutState"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System"
import { useFeatureFlag } from "System/useFeatureFlag"
import { SettingsApp_me$data } from "__generated__/SettingsApp_me.graphql"

export const SETTINGS_ROUTE_TABS_MARGIN = [2, 4]

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const { isLoggedIn } = useSystemContext()
  const isInsightsEnabled = useFeatureFlag("my-collection-web-phase-7-insights")
  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const tabsWhenCollectorProfileEnabled = compact([
    { name: "Edit Profile", url: "/settings/edit-settings" },
    { name: "Saved Alerts", url: "/settings/alerts" },
    { name: "Account", url: "/settings/edit-profile" },
    { name: "Order History", url: "/settings/purchases" },
    { name: "Bids", url: "/settings/auctions" },
    { name: "Payments", url: "/settings/payments" },
    { name: "Shipping", url: "/settings/shipping" },
  ])

  if (!isLoggedIn) {
    return <MyCollectionRouteLoggedOutState />
  }

  const tabs = compact([
    { name: "Edit Settings", url: "/settings/edit-settings" },
    { name: "Collector Profile", url: "/settings/edit-profile" },
    { name: "My Collection", url: "/settings/my-collection" },
    isInsightsEnabled && { name: "Insights", url: "/settings/insights" },
    { name: "Saves & Follows", url: "/settings/saves" },
    { name: "Alerts", url: "/settings/alerts" },
    { name: "Order History", url: "/settings/purchases" },
    { name: "Bids", url: "/settings/auctions" },
    { name: "Payments", url: "/settings/payments" },
    { name: "Shipping", url: "/settings/shipping" },
  ])

  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <Text variant={["lg-display", "xl"]} mt={4}>
        Hi, {me.name}
      </Text>

      <RouteTabs my={SETTINGS_ROUTE_TABS_MARGIN}>
        {isCollectorProfileEnabled
          ? tabsWhenCollectorProfileEnabled.map(tab => {
              return (
                <RouteTab key={tab.url} to={tab.url} variant={["xs", "sm"]}>
                  {tab.name}
                </RouteTab>
              )
            })
          : tabs.map(tab => {
              return (
                <RouteTab key={tab.url} to={tab.url} variant={["xs", "sm"]}>
                  {tab.name}
                </RouteTab>
              )
            })}
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
