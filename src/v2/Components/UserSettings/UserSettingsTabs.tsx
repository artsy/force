import React from "react"
import styled from "styled-components"
import { Box, RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { data as sd } from "sharify"

interface UserSettingsTabsProps {
  route: string
}

const isCurrentTab = (tabUrl, route) => {
  const currentRoute =
    typeof window === "undefined" ? route : window.location.pathname

  return currentRoute === tabUrl ? "active" : undefined
}

export const UserSettingsTabs: React.FC<UserSettingsTabsProps> = ({
  route,
}) => {
  return (
    <RouteTabs>
      <RouteTab class={isCurrentTab("/user/saves", route)} to="/user/saves">
        Saves & Follows
      </RouteTab>
      <RouteTab class={isCurrentTab("/profile/edit", route)} to="/profile/edit">
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
  )
}
