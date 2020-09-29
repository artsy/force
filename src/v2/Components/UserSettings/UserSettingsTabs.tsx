import React from "react"
import styled from "styled-components"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { data as sd } from "sharify"
import { Box, Text } from "@artsy/palette"

interface UserSettingsTabsProps {
  route?: string
  username?: string
}

const isCurrentTab = (tabUrl, route) => {
  const currentRoute =
    typeof window === "undefined" ? route : window.location.pathname

  return currentRoute === tabUrl ? "active" : undefined
}

export const UserSettingsTabs: React.FC<UserSettingsTabsProps> = ({
  route,
  username,
}) => {
  return (
    <Box pt={1}>
      <Box>
        <Text variant="title" my={2}>
          {username}
        </Text>
      </Box>
      <RouteTabs>
        <RouteTab class={isCurrentTab("/user/saves", route)} to="/user/saves">
          Saves & Follows
        </RouteTab>
        <RouteTab
          class={isCurrentTab("/profile/edit", route)}
          to="/profile/edit"
        >
          Collector Profile
        </RouteTab>
        <RouteTab
          class={isCurrentTab("/user/purchases", route)}
          to="/user/purchases"
        >
          Order History
        </RouteTab>
        <RouteTab
          class={isCurrentTab("/user/auctions", route)}
          to="/user/auctions"
        >
          Bids
        </RouteTab>
        <RouteTab class={isCurrentTab("/user/edit", route)} to="/user/edit">
          Settings
        </RouteTab>
        <RouteTab
          class={isCurrentTab("/user/payments", route)}
          to="/user/payments"
        >
          Payments
        </RouteTab>
      </RouteTabs>
    </Box>
  )
}
