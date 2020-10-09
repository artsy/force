import React from "react"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { Box, Text } from "@artsy/palette"

interface UserSettingsTabsProps {
  route?: string
  username?: string
}

const routes: Record<"name" | "url", string>[] = [
  {
    name: "Saves & Follows",
    url: "/user/saves",
  },
  {
    name: "Collector Profile",
    url: "/profile/edit",
  },
  {
    name: "Order History",
    url: "/user/purchases",
  },
  {
    name: "Bids",
    url: "/user/auctions",
  },
  {
    name: "Settings",
    url: "/user/edit",
  },
  {
    name: "Payments",
    url: "/user/payments",
  },
]

const tabClass = (tabUrl, route) => {
  const currentRoute =
    typeof window === "undefined" ? route : window.location.pathname

  return currentRoute === tabUrl ? "active" : undefined
}

export const UserSettingsTabs: React.FC<UserSettingsTabsProps> = ({
  route,
  username,
}) => {
  return (
    <Box pt={1} px={[2, 0]}>
      <Box>
        <Text variant="title" my={2}>
          {username}
        </Text>
      </Box>
      <RouteTabs>
        {routes.map((route, index) => (
          <RouteTab
            key={index}
            className={tabClass(route.url, route)}
            to={route.url}
          >
            {route.name}
          </RouteTab>
        ))}
      </RouteTabs>
    </Box>
  )
}
