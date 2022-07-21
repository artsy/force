import { Text } from "@artsy/palette"
import React from "react"
import { SettingsApp_me } from "v2/__generated__/SettingsApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { MetaTags } from "v2/Components/MetaTags"
import { useFeatureFlag } from "v2/System/useFeatureFlag"

interface SettingsAppProps {
  me: SettingsApp_me
}

const TABS = [
  { name: "Edit Settings", url: "/settings/edit-settings" },
  { name: "Collector Profile", url: "/settings/edit-profile" },
  { name: "Saves & Follows", url: "/settings/saves" },
  { name: "Your Alerts", url: "/settings/alerts" },
  { name: "Order History", url: "/settings/purchases" },
  { name: "Bids", url: "/settings/auctions" },
  { name: "Payments", url: "/settings/payments" },
  { name: "Shipping", url: "/settings/shipping" },
]

// Tabs with My Collection (should be removed when the feature flag is enabled)
const TABS_WITH_MYC = [
  { name: "Edit Settings", url: "/settings/edit-settings" },
  { name: "Collector Profile", url: "/settings/edit-profile" },
  { name: "My Collection", url: "/settings/my-collection" },
  { name: "Saves & Follows", url: "/settings/saves" },
  { name: "Your Alerts", url: "/settings/alerts" },
  { name: "Order History", url: "/settings/purchases" },
  { name: "Bids", url: "/settings/auctions" },
  { name: "Payments", url: "/settings/payments" },
  { name: "Shipping", url: "/settings/shipping" },
]

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const isMyCollectionEnabled = useFeatureFlag("my-collection-web")

  const tabs = isMyCollectionEnabled ? TABS_WITH_MYC : TABS
  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <Text variant="xl" mt={4}>
        Hi {me.name}
      </Text>

      <RouteTabs my={4}>
        {tabs.map(tab => {
          return (
            <RouteTab key={tab.url} to={tab.url}>
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
