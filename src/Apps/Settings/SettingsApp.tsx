import { Text } from "@artsy/palette"
import React from "react"
import { SettingsApp_me } from "__generated__/SettingsApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { MetaTags } from "Components/MetaTags"

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

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <Text variant="xl" mt={4}>
        Hi {me.name}
      </Text>

      <RouteTabs my={4}>
        {TABS.map(tab => {
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
