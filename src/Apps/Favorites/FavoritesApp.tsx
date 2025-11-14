import { Spacer, Text } from "@artsy/palette"
import { RouteTab, RouteTabs } from "Components/RouteTabs"
import { TopContextBar } from "Components/TopContextBar"
import type { FC, ReactNode } from "react"

interface FavoritesAppProps {
  children: ReactNode
}

export const FavoritesApp: FC<React.PropsWithChildren<FavoritesAppProps>> = ({
  children,
}) => {
  return (
    <>
      <TopContextBar displayBackArrow href="/collector-profile/my-collection">
        Profile
      </TopContextBar>

      <Spacer y={[2, 4]} />

      <Text variant={["lg-display", "xxl"]}>Favorites</Text>

      <Spacer y={[2, 6]} />

      <RouteTabs my={[2, 4]}>
        <RouteTab to="/favorites/saves">Saves</RouteTab>

        <RouteTab to="/favorites/follows">Follows</RouteTab>

        <RouteTab to="/favorites/alerts">Alerts</RouteTab>
      </RouteTabs>

      {children}
    </>
  )
}
