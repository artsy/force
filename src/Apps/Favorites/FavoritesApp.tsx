import { ReactNode, FC } from "react"
import { TopContextBar } from "Components/TopContextBar"
import { Spacer, Text } from "@artsy/palette"
import { RouteTab, RouteTabs } from "Components/RouteTabs"

interface FavoritesAppProps {
  children: ReactNode
}

export const FavoritesApp: FC<FavoritesAppProps> = ({ children }) => {
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
