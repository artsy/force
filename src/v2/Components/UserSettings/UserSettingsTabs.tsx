import React from "react"
import { track } from "v2/System"
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
    name: "Payments & Shipping",
    url: "/user/payments",
  },
]

const tabClass = (tabUrl, route) => {
  const currentRoute =
    typeof window === "undefined" ? route : window.location.pathname

  return currentRoute === tabUrl ? "active" : undefined
}

const useScrollIntoView = (isRouteActive: boolean) => {
  const ref = React.useRef() as React.MutableRefObject<HTMLDivElement>
  React.useEffect(() => {
    if (isRouteActive && ref?.current) {
      ref.current?.scrollIntoView &&
        ref.current.scrollIntoView({
          behavior: "smooth",
          block: "end",
          inline: "start",
        })
    }
  }, [isRouteActive])

  return { ref }
}

export const UserSettingsTabs: React.FC<UserSettingsTabsProps> = track()(
  ({ username }) => {
    return (
      <Box pt={1} px={[2, 0]}>
        <Box>
          <Text variant="title" my={2}>
            {username}
          </Text>
        </Box>

        <RouteTabs>
          {routes.map((route, index) => {
            const isActive = tabClass(route.url, route) === "active"
            const { ref } = useScrollIntoView(isActive)
            return (
              <div ref={ref} key={index}>
                <RouteTab className={tabClass(route.url, route)} to={route.url}>
                  {route.name}
                </RouteTab>
              </div>
            )
          })}
        </RouteTabs>
      </Box>
    )
  }
)

UserSettingsTabs.displayName = "UserSettingsTabs"
