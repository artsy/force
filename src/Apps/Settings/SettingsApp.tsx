import { Text } from "@artsy/palette"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { compact } from "lodash"
import React from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useFeatureFlag } from "System/useFeatureFlag"
import { SettingsApp_me } from "__generated__/SettingsApp_me.graphql"

interface SettingsAppProps {
  me: SettingsApp_me
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const isMyCollectionEnabled = useFeatureFlag("my-collection-web")

  const tabs = compact([
    { name: "Edit Settings", url: "/settings/edit-settings" },
    { name: "Collector Profile", url: "/settings/edit-profile" },
    isMyCollectionEnabled && {
      name: "My Collection",
      url: "/settings/my-collection",
    },
    { name: "Saves & Follows", url: "/settings/saves" },
    { name: "Your Alerts", url: "/settings/alerts" },
    { name: "Order History", url: "/settings/purchases" },
    { name: "Bids", url: "/settings/auctions" },
    { name: "Payments", url: "/settings/payments" },
    { name: "Shipping", url: "/settings/shipping" },
  ])

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
