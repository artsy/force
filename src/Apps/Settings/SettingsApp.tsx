import {
  Breadcrumbs,
  ChevronIcon,
  Flex,
  Spacer,
  Text,
  useToasts,
} from "@artsy/palette"
import { MyCollectionRouteLoggedOutState } from "Apps/Settings/Routes/MyCollection/MyCollectionRouteLoggedOutState"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { Link } from "found"
import { compact } from "lodash"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useRouter } from "System/Router/useRouter"
import { useFeatureFlag } from "System/useFeatureFlag"
import { SettingsApp_me$data } from "__generated__/SettingsApp_me.graphql"

export const SETTINGS_ROUTE_TABS_MARGIN = [2, 4]

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const { isLoggedIn } = useSystemContext()

  const isCollectorProfileEnabled = useFeatureFlag("cx-collector-profile")

  const { sendToast } = useToasts()

  const {
    match: { location },
  } = useRouter()

  // Errors might come back from 3rd party authentication
  // as a string in an `error` query param, so display them if present.
  useEffect(() => {
    if (!location.query.error) return

    sendToast({
      message: location.query.error,
      variant: "error",
      ttl: Infinity,
    })
  }, [location.query.error, sendToast])

  const tabsWhenCollectorProfileEnabled = compact([
    { name: "Edit Profile", url: "/settings/edit-profile" },
    { name: "Saved Alerts", url: "/settings/alerts" },
    { name: "Account", url: "/settings/edit-settings" },
    { name: "Order History", url: "/settings/purchases" },
    { name: "Bids", url: "/settings/auctions" },
    { name: "Payments", url: "/settings/payments" },
    { name: "Shipping", url: "/settings/shipping" },
  ])

  if (!isLoggedIn) {
    return <MyCollectionRouteLoggedOutState />
  }

  const tabs = compact([
    { name: "Edit Settings", url: "/settings/edit-settings" },
    {
      name: isCollectorProfileEnabled ? "Edit Profile" : "Collector Profile",
      url: "/settings/edit-profile",
    },
    { name: "My Collection", url: "/settings/my-collection" },
    { name: "Insights", url: "/settings/insights" },
    { name: "Saves & Follows", url: "/settings/saves" },
    { name: "Alerts", url: "/settings/alerts" },
    { name: "Order History", url: "/settings/purchases" },
    { name: "Bids", url: "/settings/auctions" },
    { name: "Payments", url: "/settings/payments" },
    { name: "Shipping", url: "/settings/shipping" },
  ])

  return (
    <>
      <MetaTags title="Settings | Artsy" />

      {isCollectorProfileEnabled ? (
        <>
          <Breadcrumbs>
            <Link to="/collector-profile/my-collection">
              <Flex flexDirection="row" alignItems="center" py={2}>
                <ChevronIcon
                  direction="left"
                  color="black100"
                  height={14}
                  width={14}
                />
                <Text variant="xs" pl={1}>
                  Collector Profile
                </Text>
              </Flex>
            </Link>
          </Breadcrumbs>
          <Spacer y={6} />
        </>
      ) : (
        <Text
          variant={["lg-display", "xl"]}
          mt={[2, 4]}
        >{`Hi, ${me.name}`}</Text>
      )}

      <RouteTabs my={SETTINGS_ROUTE_TABS_MARGIN}>
        {isCollectorProfileEnabled
          ? tabsWhenCollectorProfileEnabled.map(tab => {
              return (
                <RouteTab key={tab.url} to={tab.url} variant={["xs", "sm"]}>
                  {tab.name}
                </RouteTab>
              )
            })
          : tabs.map(tab => {
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
