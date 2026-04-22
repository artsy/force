import type { HomeRailTrackingProps } from "Apps/Home/homeRailPositionY"
import { Tab, Tabs } from "@artsy/palette"
import { useSystemContext } from "System/Hooks/useSystemContext"
import type * as React from "react"
import { HomeNewWorksForYouRailQueryRenderer } from "./HomeNewWorksForYouRail"
import { HomeRecentlyViewedRailQueryRenderer } from "./HomeRecentlyViewedRail"
import { HomeWorksByArtistsYouFollowRailQueryRenderer } from "./HomeWorksByArtistsYouFollowRail"

export const HomeWorksForYouTabBar: React.FC<
  React.PropsWithChildren<HomeRailTrackingProps>
> = ({ railPositionY }) => {
  const { user } = useSystemContext()

  if (!user) {
    return null
  }

  return (
    <Tabs>
      <Tab name="New Works for You">
        <HomeNewWorksForYouRailQueryRenderer railPositionY={railPositionY} />
      </Tab>
      <Tab name="New Works by Artists You Follow">
        <HomeWorksByArtistsYouFollowRailQueryRenderer
          railPositionY={railPositionY}
        />
      </Tab>
      <Tab name="Recently Viewed">
        <HomeRecentlyViewedRailQueryRenderer railPositionY={railPositionY} />
      </Tab>
    </Tabs>
  )
}
