import { Text } from "@artsy/palette"
import React from "react"
import { SettingsApp_me$data } from "v2/__generated__/SettingsApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { MetaTags } from "v2/Components/MetaTags"

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const TABS = [
  { name: "Edit Settings", url: "/settings/edit-settings" },
  { name: "Collector Profile", url: "/settings/edit-profile" },
  { name: "Saves & Follows", url: "/settings/saves" },
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
