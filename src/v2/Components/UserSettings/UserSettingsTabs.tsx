import * as React from "react"
import { track } from "v2/System"
import { RouteTab, RouteTabs } from "v2/Components/RouteTabs"
import { Box, Text, TextVariant, useThemeConfig } from "@artsy/palette"
import { getENV } from "v2/Utils/getENV"

interface UserSettingsTabsProps {
  route?: string
  username: string | null
}

const sourceRoutes: Record<"name" | "url", string>[] = [
  {
    name: "Saves & Follows",
    url: "/user/saves",
  },
  {
    name: "Alerts",
    url: "/user/alerts",
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
  {
    name: "Shipping",
    url: "/user/shipping",
  },
]

const tabClass = (tabUrl, route) => {
  const currentRoute =
    typeof window === "undefined" ? route : window.location.pathname

  return currentRoute === tabUrl ? "active" : undefined
}

export const UserSettingsTabs: React.FC<UserSettingsTabsProps> = track()(
  ({ username }) => {
    const tokens = useThemeConfig({
      v2: {
        variant: "title" as TextVariant,
      },
      v3: {
        variant: "xl" as TextVariant,
      },
    })
    const routes = sourceRoutes.filter(route => {
      if (route.name === "Alerts") {
        return getENV("ENABLE_SAVED_SEARCH")
      }

      return true
    })

    return (
      <Box pt={1}>
        <Box>
          <Text variant={["lg", tokens.variant]} mt={2} mb={4}>
            {username}
          </Text>
        </Box>

        <RouteTabs>
          {routes.map((route, index) => (
            <RouteTab
              key={route.name}
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
)

UserSettingsTabs.displayName = "UserSettingsTabs"
