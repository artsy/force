import { Spacer, useToasts } from "@artsy/palette"
import { MyCollectionRouteLoggedOutState } from "Apps/Settings/Routes/MyCollection/MyCollectionRouteLoggedOutState"
import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import React, { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"
import { useSystemContext } from "System/useSystemContext"
import { useRouter } from "System/Router/useRouter"
import { SettingsApp_me$data } from "__generated__/SettingsApp_me.graphql"
import { TopContextBar } from "Components/TopContextBar"

export const SETTINGS_ROUTE_TABS_MARGIN = [2, 4]
const SETTINGS_TABS = [
  { name: "Edit Profile", url: "/settings/edit-profile" },
  { name: "Account Settings", url: "/settings/edit-settings" },
  { name: "Saved Alerts", url: "/settings/alerts" },
  { name: "Order History", url: "/settings/purchases" },
  { name: "Bids", url: "/settings/auctions" },
  { name: "Payments", url: "/settings/payments" },
  { name: "Shipping", url: "/settings/shipping" },
]

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const SettingsApp: React.FC<SettingsAppProps> = ({ me, children }) => {
  const { isLoggedIn } = useSystemContext()

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

  if (!isLoggedIn) {
    return <MyCollectionRouteLoggedOutState />
  }

  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <TopContextBar displayBackArrow href="/collector-profile/my-collection">
        Collector Profile
      </TopContextBar>

      <Spacer y={[4, 6]} />

      <RouteTabs my={SETTINGS_ROUTE_TABS_MARGIN}>
        {SETTINGS_TABS.map(tab => {
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
