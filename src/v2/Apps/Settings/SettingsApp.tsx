import { Box, Text } from "@artsy/palette"
import React from "react"
import { SettingsApp_me } from "v2/__generated__/SettingsApp_me.graphql"
import { createFragmentContainer, graphql } from "react-relay"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"

interface SettingsAppProps {
  me: SettingsApp_me
}

const tabs = [
  {
    name: "Saves & Follows",
    url: "/settings2/saves",
  },
  {
    name: "Collector Profile",
    url: "/settings2/edit-profile",
  },
  {
    name: "Order History",
    url: "/settings2/purchases",
  },
  {
    name: "Bids",
    url: "/settings2/auctions",
  },
  {
    name: "Edit Settings",
    url: "/settings2/edit-settings",
  },
  {
    name: "Payments",
    url: "/settings2/payments",
  },
  {
    name: "Shipping",
    url: "/settings2/shipping",
  },
]

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  return (
    <>
      <Text variant="lg" mt={[2, 4]}>
        Hi {me.name}!
      </Text>

      <RouteTabs my={4}>
        {tabs.map((tab, index) => {
          return <RouteTab to={tab.url}>{tab.name}</RouteTab>
        })}
      </RouteTabs>

      <Box>{children}</Box>
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
