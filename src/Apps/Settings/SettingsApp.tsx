import { Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { SettingsApp_me } from "__generated__/SettingsApp_me.graphql"

export const SETTINGS_ROUTE_TABS_MARGIN = [2, 4]

const TABS = [
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

interface SettingsAppProps {
  me: SettingsApp_me
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <Text variant={["lg-display", "xl"]} mt={4}>
        Hi, {me.name}
      </Text>

      <RouteTabs my={SETTINGS_ROUTE_TABS_MARGIN}>
        {TABS.map(tab => {
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
