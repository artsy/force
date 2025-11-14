import { MetaTags } from "Components/MetaTags"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { TopContextBar } from "Components/TopContextBar"
import { useRouter } from "System/Hooks/useRouter"
import { Spacer, Text, useToasts } from "@artsy/palette"
import type { SettingsApp_me$data } from "__generated__/SettingsApp_me.graphql"
import type React from "react"
import { useEffect } from "react"
import { createFragmentContainer, graphql } from "react-relay"

interface SettingsAppProps {
  me: SettingsApp_me$data
}

const SettingsApp: React.FC<React.PropsWithChildren<SettingsAppProps>> = ({
  children,
}) => {
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
      ttl: Number.POSITIVE_INFINITY,
    })
  }, [location.query.error, sendToast])

  return (
    <>
      <MetaTags title="Settings | Artsy" />

      <TopContextBar displayBackArrow href="/collector-profile/my-collection">
        Profile
      </TopContextBar>

      <Spacer y={[2, 4]} />

      <Text variant={["lg-display", "xxl"]}>Settings</Text>

      <Spacer y={[2, 6]} />

      <RouteTabs my={[2, 4]}>
        <RouteTab to="/settings/edit-profile">Edit Profile</RouteTab>

        <RouteTab to="/settings/edit-settings">Account Settings</RouteTab>

        <RouteTab to="/settings/auctions">Bids</RouteTab>

        <RouteTab to="/settings/orders">Order History</RouteTab>

        <RouteTab to="/settings/payments">Payments</RouteTab>

        <RouteTab to="/settings/shipping">Shipping</RouteTab>
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
  },
)
